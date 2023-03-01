import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import {
    PluginCommonModule,
    VendurePlugin,
    ID,
} from '@vendure/core';
import { ModuleConfiguration } from './entities/module-configuration.entity';
import { ModuleConfigurationService } from './service/module-configuration.service';
import { ModuleConfigurationAdminResolver, ModuleConfigurationShopResolver } from './api/module-configuration.resolver';
import { moduleConfigurationPermission } from './index';
import { adminSchemaExtension, shopSchemaExtension} from './api/api-extensions';

export type ModuleConfigurationInput = {
  name: string;
  status: boolean;
};

export type UpdateModuleConfigurationInput = {
  name: string;
  status: boolean;
  id: ID;
  createdAt: Date;
  updatedAt: Date;
};

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ModuleConfiguration],
  providers: [ModuleConfigurationService],
  adminApiExtensions: {
    schema: adminSchemaExtension,
    resolvers: [
        ModuleConfigurationAdminResolver
    ],
  },
  shopApiExtensions: {
    schema: shopSchemaExtension,
    resolvers: [
        ModuleConfigurationShopResolver
    ],
  },
  configuration: (config) => {
    config.authOptions.customPermissions.push(moduleConfigurationPermission);
    return config;
  },
})

export class ModuleConfigurationPlugin {
  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, './ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'module-configuration',
        ngModuleFileName: 'module-configuration.module.ts',
        ngModuleName: 'ModuleConfigurationModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'module-configuration-nav.module.ts',
        ngModuleName: 'ModuleConfigurationNavModule',
      },
    ],
  };
}