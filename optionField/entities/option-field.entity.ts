import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column,Entity } from 'typeorm';

@Entity()
export class OptionField extends VendureEntity{
    constructor(input?: DeepPartial<OptionField>){
        super(input);
    }
    
    // Display to Billing Address option
    @Column()
    billingaddrOption : boolean;
}
