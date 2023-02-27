import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core';
import { schemaExtension } from './api/api-extensions';
import { iamportPaymentOptionResolver } from './api/iamportPaymentOption.resolver';
import {PGS} from './constants';

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
      schema: schemaExtension,
      resolvers: [iamportPaymentOptionResolver],
    },
    shopApiExtensions: {
      schema: schemaExtension,
      resolvers: [iamportPaymentOptionResolver],
    },
    configuration: config => {
      config.customFields.GlobalSettings.push({
        type: 'string',
        name: 'paymentStoreName',
        ui: {tab: 'Payment' },
      });
      config.customFields.GlobalSettings.push({
        type: 'string',
        name: 'paymentpgOption',
        ui: { tab: 'Payment' },
        options: [
          { value: PGS[0].value, label:[{languageCode: LanguageCode.en, value:PGS[0].label}]},
          { value: PGS[1].value, label:[{languageCode: LanguageCode.en, value:PGS[1].label}]}
        ],
      });
      config.customFields.GlobalSettings.push({
          type: 'string',
          name: 'paymentUserCode',
          ui: {tab: 'Payment' },
          nullable: true,
      });
      return config;
    }
})
export class IamportPaymentOptionPlugin{}