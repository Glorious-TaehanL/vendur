import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { RandomCatResolver } from './api/randomCat.resolver';
import { schemaExtension } from './api/api-extensions';
import { CatFetcher } from './service/randomCat.serivce';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [CatFetcher],
    adminApiExtensions: {
      schema: schemaExtension,
      resolvers: [RandomCatResolver],
    },
    shopApiExtensions: {
        schema: schemaExtension,
        resolvers: [RandomCatResolver],
    },

    configuration: config => {
        config.customFields.Product.push({
            type: 'string',
            name: 'catImageUrl',
        });
        return config;
    }
})
export class RandomCatPlugin {}