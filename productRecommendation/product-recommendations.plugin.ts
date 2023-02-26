import {
    VendurePlugin,
    PluginCommonModule,
    ID,
    LanguageCode,
  } from "@vendure/core";
  import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
  import path from 'path';
  import {
    ProductRecommendation,
    RecommendationType,
  } from "./entities/product-recommendation.entity";
  import {
    ProductRecommendationAdminResolver,
    ProductRecommendationShopResolver,
    ProductRecommendationEntityResolver,
    ProductEntityResolver,
  } from "./api/product-recommendations.resolver";
  import { ProductRecommendationService } from "./services/product-recommendations.service";
  import { adminSchemaExtension, shopSchemaExtension} from "./api/api-extensions";



@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [ProductRecommendation],
    providers: [ProductRecommendationService],
    adminApiExtensions: {
      schema: adminSchemaExtension,
      resolvers: [
        ProductRecommendationAdminResolver,
        ProductRecommendationEntityResolver,
        ProductEntityResolver,
      ],
    },
    shopApiExtensions: {
      schema: shopSchemaExtension,
      resolvers: [
        ProductRecommendationShopResolver,
        ProductRecommendationEntityResolver,
        ProductEntityResolver,
      ],
    },
    configuration: (config) => {
      config.customFields.Product.push({
        type: "boolean",
        name: "productRecommendationsEnabled",
        label: [
          { languageCode: LanguageCode.en, value: "Has product recommendations" },
        ],
        ui: { component: 'product-recommendation-input' },
      });
      return config;
    },
  })
  export class ProductRecommendationsPlugin {
    static ui: AdminUiExtension = {
      extensionPath: path.join(__dirname, './ui/'),
      ngModules: [
        {
          type: "shared",
          ngModuleFileName: "product-recommendations-input.module.ts",
          ngModuleName: "ProductRecommendationsInputModule",
        }
      ]
    };
  }