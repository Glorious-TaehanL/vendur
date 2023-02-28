
import {    LanguageCode,
            HistoryEntryType
 } from '@vendure/common/lib/generated-types';
import {
    CreatePaymentErrorResult,
    CreatePaymentResult,
    CreateRefundResult,
    HistoryService,
    Logger,
    PaymentMethodHandler,
    PaymentMethodService,
    SettlePaymentResult,
} from '@vendure/core';
import { getServerLocation } from '@vendure/admin-ui/core';
import { DOCUMENT } from '@angular/common';
import { IamportService } from './iamport-payment-handler.service';

const axios = require('axios');
let historyService: HistoryService;
let iamportService: IamportService;


export const iamportPaymentHandler = new PaymentMethodHandler({
    code: 'iamport-payment',
    description: [
        {
            languageCode: LanguageCode.en,
            value: 'Iamport payment',
        },
    ],
    args: {},
    init(injector) {
        historyService = injector.get(HistoryService);
        // iamportService = injector.get(IamportService);
    },
    createPayment: async (
        ctx,
        order,
        amount,
        args,
        metadata,
    ): Promise<CreatePaymentResult | CreatePaymentErrorResult> => {
        // const meta = JSON.parse(JSON.stringify(metadata));
        Logger.info(`created payment for ${order.code}`);
        await historyService.createHistoryEntryForOrder({
            orderId: order.id,
            ctx,
            type: HistoryEntryType.ORDER_NOTE,
            data: {
                note: "Customer Memo : "+metadata.memo 
            }
        });
        return {
            amount,
            state: 'Settled',
            // transactionId: order.id.toString(),
            transactionId: metadata.merchantuid,
            metadata: metadata.impUid, // Store all given metadata on a payment
        };
    },
    settlePayment: async (ctx, order, payment, args): Promise<SettlePaymentResult> => {
        // this should never be called\
        return { success: true };
    },

    async createRefund(ctx,input,amount,order,payment,args){
        let serverPath = ctx.req?.hostname;
        let errMessage;
        var paymentid = payment.metadata;
        let refundReasult = await axios.post(`https://${serverPath}/api/refund?paymentid=${paymentid}&amount=${amount}`);
        console.log(refundReasult);
        if( refundReasult.data.code != 0){
            errMessage = refundReasult.data.message;
        }else{
            errMessage = "success to refund"
        }
        
        await historyService.createHistoryEntryForOrder({
            orderId: order.id,
            ctx,
            type: HistoryEntryType.ORDER_NOTE,
            data: {
                note: "Payment Memo :: " + errMessage,
            }
        });
        return {
            state: "Settled" as const,
            transactionId: "none",
            metadata: payment.metadata,
        };
    }

});
