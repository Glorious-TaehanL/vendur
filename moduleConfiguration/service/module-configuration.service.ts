import { Injectable } from '@nestjs/common';
import { ID, TransactionalConnection } from '@vendure/core';
import { ModuleConfiguration } from '../entities/module-configuration.entity';
import { ModuleConfigurationInput, UpdateModuleConfigurationInput } from '../module-configuration.plugin';
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

@Injectable()
export class ModuleConfigurationService {
    constructor(private connection: TransactionalConnection) {}

    findOne(id: ID): Promise<ModuleConfiguration | undefined> {
        return this.connection
          .getRepository(ModuleConfiguration)
          .findOne(id)
    }

    findAll(): Promise<ModuleConfiguration[]> {
      return this.connection.getRepository(ModuleConfiguration).find();
    }

    findAllModule(
      options: FindManyOptions<ModuleConfiguration> | undefined
    ): Promise<ModuleConfiguration[]> {
      return this.connection.getRepository(ModuleConfiguration).find(options);
    }

    async addModule(module: ModuleConfigurationInput): Promise<ModuleConfiguration> {
      return this.connection.getRepository(ModuleConfiguration).save(module);
    }

    async updateModule(module: UpdateModuleConfigurationInput): Promise<ModuleConfiguration> {
      return this.connection.getRepository(ModuleConfiguration).save(module);
    }
    
}

