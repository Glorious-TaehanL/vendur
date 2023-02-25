import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Ctx, Allow, ProductService, RequestContext, Transaction } from '@vendure/core';
import { Permission } from '@vendure/common/lib/generated-types';
import { CatFetcher } from '../service/randomCat.serivce';

@Resolver()
export class RandomCatResolver {

  constructor(private productService: ProductService, private catFetcher: CatFetcher) {}

  @Transaction()
  @Mutation()
  @Allow(Permission.UpdateCatalog)
  async addRandomCat(@Ctx() ctx: RequestContext, @Args() args : any) {
    const catImageUrl = await this.catFetcher.fetchCat();
    return this.productService.update(ctx, {
      id: args.id,
      customFields: { catImageUrl },
    });
  }

  @Transaction()
  @Query()
  @Allow(Permission.ReadCatalog)
  async getRandomCatImage(@Ctx() ctx: RequestContext, @Args() args : any){
    return this.productService.findOne(ctx,args.id);
  }

}