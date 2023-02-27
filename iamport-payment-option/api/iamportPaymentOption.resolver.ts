import { Args, ResolveField, Resolver, Query, Mutation} from '@nestjs/graphql';
import { Permission } from '@vendure/common/lib/generated-types';
import { Ctx, RequestContext, Allow, GlobalSettingsService, TransactionalConnection, GlobalSettings, CustomGlobalSettingsFields } from '@vendure/core';


@Resolver()
export class iamportPaymentOptionResolver{

    constructor(private globalSettingsService: GlobalSettingsService,private connection: TransactionalConnection) {}

    @Query()
    async getPaymentOption(@Ctx() ctx: RequestContext, @Args() args : any ){
        const globalsettings = await this.connection.getEntityOrThrow(ctx,GlobalSettings,args.id);
        const paymentUserCode = globalsettings.customFields;

        if(args.option == true){
            return paymentUserCode;
        }else{
            return false;
        }
    }
}