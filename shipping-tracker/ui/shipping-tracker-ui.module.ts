import { NgModule } from '@angular/core';
import { registerFormInputComponent, SharedModule } from '@vendure/admin-ui/core';
import { OrderService } from '@vendure/core';
import { ShippingTrackerComponent } from './component/shipping-tracker.component'; 

@NgModule({
    imports: [SharedModule],
    declarations: [ShippingTrackerComponent],
    providers:[
        registerFormInputComponent('shipping-tracker-link',ShippingTrackerComponent),
    ],
    exports:[],
})
export class ShippingTrackerModule {}