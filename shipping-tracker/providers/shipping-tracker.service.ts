
import { Controller, Post, Query,Injectable, Res } from '@nestjs/common';
import { HistoryService } from '@vendure/core';
import axios from 'axios';
let historyService: HistoryService;
let accessToken, refundData;
const TOKEN_URL= "https://api.iamport.kr/users/getToken"
const CANCEL_URL = "https://api.iamport.kr/payments/cancel";
type refundType = {
    code: number;
    message: string;
    response: any;
}

@Injectable()
export class ShippingTrackerService{
    async getRefundProcess(paymentId: any, amount: any, @Res() res:any) {
        axios.post(TOKEN_URL,{
            imp_key: "5048607144687236",
            imp_secret: "Gl6H4F3G1hc4pENAirDZwvZqdcd0THn1CTvodDZrX0xqUMlNadJ1sw9THAVBLbUpauhkSFB5wRx7UMT9"
        },{
            headers: { "Content-Type": "application/json" } // "Content-Type": "application/json"            
        }).then(async (response) => {
            accessToken = response.data.response.access_token;
            return await this.getRefundPaymentData(accessToken,paymentId,amount,res);
        }).catch(function (error) {
            // error 
            console.log(error);
        });
    }
    
    getRefundPaymentData(accessToken: any, paymentId: any, amount: any, @Res() res:any) {
           
        console.log("accessToken ID :: " + accessToken);
        console.log("payment ID :: " + paymentId);
        console.log("amount :: " + amount);
        console.log("post - start");
    
        axios.post(CANCEL_URL,{
            imp_uid: paymentId,
            reason: " Vendure Admin Request",
            checksum: amount/100,
        },{headers:{ "Authorization": "Bearer " + accessToken }
        }).then(async function (response) {
            let objRefundData : refundType ={
                code: response.data.code,
                message: response.data.message,
                response:response.data.response
            }
            return res.send(objRefundData);
    
        }).catch(function (error){
            console.log("ERROR :: " + error);
            return error;
        });

    }
    
    test(@Res() res){
        return res.send("HELLO WOLD");
    }
    
}
