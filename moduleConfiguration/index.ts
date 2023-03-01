import { PermissionDefinition } from '@vendure/core';

export const moduleConfigurationPermission = new PermissionDefinition({
  name: 'ModuleConfiguration',
  description: 'Allows administrator to module configuration',
});
export * from './module-configuration.plugin';
export * from './api/module-configuration.resolver';

export const modules = [
  {
    name: "Top Sellers",
    status: true
  },
  {
    name: "New Arrivals",
    status: true
  }
]