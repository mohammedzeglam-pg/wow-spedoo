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
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [SidebarComponent, HeaderComponent, HomeComponent],
  exports: [HomeComponent],
})
export class DashboardModule {}
