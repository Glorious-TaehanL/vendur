import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Ctx, RequestContext, ID, Transaction, ConfigArgService, Allow } from '@vendure/core';
import { ModuleConfiguration } from '../entities/module-configuration.entity';
import { ModuleConfigurationService } from '../service/module-configuration.service';
import { moduleConfigurationPermission } from '../index';

@Resolver()
export class ModuleConfigurationAdminResolver {

  constructor(private moduleConfigurationService: ModuleConfigurationService) {}

  @Query()
  async getAllModules() {
    return await this.moduleConfigurationService.findAll();
  }

  @Query( () => ModuleConfiguration)
  async getModule(@Args() args: { id: ID }) {
    return await this.moduleConfigurationService.findOne(args.id);
  }

  @Mutation()
  @Allow(moduleConfigurationPermission.Permission)
  async addModule(@Args() args: { name: string, status: boolean }) {
    return await this.moduleConfigurationService.addModule(args);
  }

  @Mutation()
  @Allow(moduleConfigurationPermission.Permission)
  async updateModule( 
    @Ctx() ctx: RequestContext,
    @Args() args: { name: string[]; status: boolean[] } 
  ): Promise<Boolean> {
    const modules: ModuleConfiguration[] = await this.moduleConfigurationService.findAll();
    const currentDate = new Date();
    
    for (let i=0; i < args.name.length; i++) {
      if(modules[i]['status'] != args.status[i]){
        modules[i]['status'] = (args.status[i]);
        modules[i]['updatedAt'] = currentDate;
      }
    }

    const sortArrayOfObjects = <T>(
      data: T[],
      keyToSort: keyof T,
      direction: 'ascending' | 'descending' | 'none',
    ) => {
      if (direction === 'none') {
        return data
      }
      const compare = (objectA: T, objectB: T) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]
    
        if (valueA === valueB) {
          return 0
        }
    
        if (valueA > valueB) {
          return direction === 'ascending' ? 1 : -1
        } else {
          return direction === 'ascending' ? -1 : 1
        }
      }
    
      return data.slice().sort(compare)
    }

    const module = sortArrayOfObjects(modules, "id", "ascending");
    
    const promises: Promise<any>[] = module.map((m) =>
      this.moduleConfigurationService.updateModule(
      {
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
        name: m.name,
        status: m.status,
        id: m.id
      })
    );

    await Promise.all(promises);

    return true;
  }
}

@Resolver()
export class ModuleConfigurationShopResolver {
  constructor(private moduleConfigurationService: ModuleConfigurationService) {}

  @Query()
  async getAllModules() {
    return await this.moduleConfigurationService.findAll();
  }

  @Query( () => ModuleConfiguration)
  async getModule(@Args() args: { id: ID }) {
    return await this.moduleConfigurationService.findOne(args.id);
  }
}