import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import { ShippingTrackerController } from './api/shipping-tracker.controller';
import { ShippingTrackerService } from './providers/shipping-tracker.service';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [ShippingTrackerService],
    controllers: [ShippingTrackerController],
    configuration: config => {
        config.customFields.Fulfillment.push({
            type: "float",
            public: true,
            defaultValue: 0,
            name: "shippingtrack",
            label: [
              { languageCode: LanguageCode.en, value: "tracking information" },
            ],
            ui: { component: 'shipping-tracker-link' },
          });
        return config;
    }
})
export class ShippingTrackerPlugin {
    static ui: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules:[
        {
            type: 'shared',
            ngModuleFileName: 'shipping-tracker-ui.module.ts',
            ngModuleName:  'ShippingTrackerModule'
        }
        ]
    }
}