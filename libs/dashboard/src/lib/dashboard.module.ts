import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@wow-spedoo/shared';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'payment',
        loadChildren: () =>
          import('@wow-spedoo/payment').then((m) => m.PaymentModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('@wow-spedoo/user').then((m) => m.UserModule),
      },
      {
        path: 'region',
        loadChildren: () =>
          import('@wow-spedoo/region').then((m) => m.RegionModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('@wow-spedoo/order').then((m) => m.OrderModule),
      },
      {
        path: 'delivery',
        loadChildren: () =>
          import('@wow-spedoo/delivery').then((m) => m.DeliveryModule),
      },

      {
        path: 'store',
        loadChildren: () =>
          import('@wow-spedoo/store').then((m) => m.StoreModule),
      },
      {
        path: 'pick',
        loadChildren: () =>
          import('@wow-spedoo/pick').then((m) => m.PickModule),
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [SidebarComponent, HeaderComponent, HomeComponent],
  exports: [HomeComponent],
})
export class DashboardModule {}
