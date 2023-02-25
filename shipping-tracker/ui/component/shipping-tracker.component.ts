import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomFieldControl, CustomFieldsFragment, DataService, getServerLocation } from '@vendure/admin-ui/core';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@vendure/core';
import { parse } from "graphql";
import { getIdByName } from '../shipping-constants';

const DEV_URL= "https://api.iamport.kr/users/getToken";
 
@Component({
    selector: 'shipping-tracker-api-link',
    template: `
        <div *ngIf="fulfillmentData$">
            <div *ngFor="let fulfillmentData of fulfillmentData$ | async">
                <a href= {{targetURL}} target="_blank">View shipping tracking</a>
            </div>
        </div>
    `,
    styles: [``],
})
export class ShippingTrackerComponent implements OnInit, CustomFieldControl{
    isListInput?: boolean | undefined;
    readonly: boolean;
    formControl: FormControl;
    config: CustomFieldsFragment;
    orderId: string;
    fulfillmentData$: any;
    targetURL: string;
    fulfill: any;
    serverPath: any;

    constructor(private dataService: DataService, private route: ActivatedRoute) {
        this.serverPath = getServerLocation();
    }

    trackingCode: string;


    ngOnInit() {
        this.orderId = this.getOrderForUrl();
        this.fulfillmentData$ = this.dataService
        .query<
        {
            order: {
                fulfillments: {
                    method: String;
                    trackingCode: String;
                };
              };
            },
            { id: ID }
        >(
            parse(
                `query GetFulfillmentByOrder($id: ID!){
                    order(id:$id){
                        fulfillments{
                            method
                            trackingCode
                        }
                    }
                }`
            ),
            { id: this.orderId }
        ).mapSingle(({order}) => order.fulfillments);

        this.fulfillmentData$.subscribe((response: any) =>{
            const method = response[0].method;
            const trackingCode = response[0].trackingCode;
            const shippingId = getIdByName(method);
            this.targetURL="https://tracker.delivery/#/"+shippingId+"/"+trackingCode;
        }
        );
    }
    private getOrderForUrl(): string{
        var urlParam = window.location.pathname;
        return urlParam.split("orders/")[1].toString();
    }
}
