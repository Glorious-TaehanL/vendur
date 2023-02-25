import { Controller, Post, Query, Get, Res } from '@nestjs/common';
import { ShippingTrackerService } from '../providers/shipping-tracker.service';
let objRefundData;


@Controller('api')
export class ShippingTrackerController{
    constructor(private shippingTrackerService: ShippingTrackerService){
        this.shippingTrackerService = shippingTrackerService;
    }

    @Post('/refund')
    async refundPayment(
        @Query('paymentid') paymentId : number,
        @Query('amount') amount: number,
        @Res() res:any
        ) {
        return await this.shippingTrackerService.getRefundProcess(paymentId,amount,res);
    }
    @Get('/test')
    test(@Res() res){
        this.shippingTrackerService.test(res);
    }

}
