import path from 'path';
import { PluginCommonModule, VendurePlugin, LanguageCode, ProductService } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

@VendurePlugin({
  imports: [PluginCommonModule],
  
})
export class NewArrivalsPlugin {
  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, './ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'new-arrivals',
        ngModuleFileName: 'new-arrivals.module.ts',
        ngModuleName: 'NewArrivalsModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'new-arrivals-nav.module.ts',
        ngModuleName: 'NewArrivalsNavModule',
      },
    ],
  };
}