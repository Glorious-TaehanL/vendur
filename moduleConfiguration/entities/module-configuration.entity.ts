import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity } from "@vendure/core";
import { Column, Entity } from "typeorm";

export declare class CustomModuleFields{   
}

@Entity()
export class ModuleConfiguration extends VendureEntity { 
  constructor(input?: DeepPartial<ModuleConfiguration>) {
    super(input);
  }
  
  @Column()
  name: string;

  @Column()
  status: boolean;

}