import { HistoryService, PluginCommonModule, RuntimeVendureConfig, VendurePlugin } from '@vendure/core';
import { gql } from 'graphql-tag';
import { iamportPaymentHandler } from './iamport-payment-handler.handler';
import { IamportService } from './iamport-payment-handler.service';


/**
 * @description
 * Configuration options for the payments plugin.
 *
 */
export interface IamportPluginOptions {
    /**
     * @description
     * The host of your storefront application, e.g. `'https://localhost.com'`
     */
    vendureHost: string;
}

@VendurePlugin({
    imports: [PluginCommonModule],
    providers:[
        IamportService
    ],
    configuration: (config: RuntimeVendureConfig) => {
        config.paymentOptions.paymentMethodHandlers.push(iamportPaymentHandler);
        return config;
    },
})
export class IamportPlugin {
    constructor( private historyService: HistoryService ){}
    static options: IamportPluginOptions;

    /**
     * @description
     * Initialize the payment plugin
     * @param vendureHost is needed to pass to for callback
     */
    static init(options: IamportPluginOptions): typeof IamportPlugin {
        this.options = options;
        return IamportPlugin;
    }
}