import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { OptionField } from './entities/option-field.entity'

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [OptionField],
    configuration: config => {
        config.customFields.GlobalSettings.push({
            name: "display_billing_address",
            public: true,
            type: "string",
        });
        return config;
    }
})
export class OptionFieldPlugin {}