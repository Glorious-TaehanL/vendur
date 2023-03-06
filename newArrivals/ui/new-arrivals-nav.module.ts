import { NgModule } from '@angular/core';
import { addNavMenuItem, SharedModule } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuItem(
      {
        id: 'new-arrivals',
        label: 'New Arrivals',
        routerLink: ['/extensions/new-arrivals'],
        icon: 'plugin'
      },
      'module-configuration'
    ),
  ],
})
export class NewArrivalsNavModule {}
