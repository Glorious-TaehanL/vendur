import { NgModule } from '@angular/core';
import { addNavMenuSection, SharedModule } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: 'module-configuration',
        label: 'Module Configuration',
        items: [{
          id: 'module-configuration',
          label: 'Module Configuration',
          routerLink: ['/extensions/module-configuration']
        }],
        // requiresPermission: 'ModuleConfiguration',
      },
      'settings'
    ),
  ],
})
export class ModuleConfigurationNavModule {}
