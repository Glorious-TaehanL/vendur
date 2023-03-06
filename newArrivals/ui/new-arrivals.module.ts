import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { NewArrivalsComponent } from './components/new-arrivals.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NewArrivalsComponent,
        data: { breadcrumb: 'New Arrivals' },
      },
    ]),
  ],
  providers: [
    
  ],
  declarations: [NewArrivalsComponent],
})
export class NewArrivalsModule {}
