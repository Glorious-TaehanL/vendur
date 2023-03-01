import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { ModuleConfigurationComponent } from './components/module-configuration.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ModuleConfigurationComponent,
        data: { breadcrumb: 'Module Configuration' },
      },
    ]),
  ],
  providers: [
    
  ],
  declarations: [ModuleConfigurationComponent],
})
export class ModuleConfigurationModule {}
