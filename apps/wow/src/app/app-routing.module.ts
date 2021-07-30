import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('@wow-spedoo/auth').then((m) => m.AuthModule),
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@wow-spedoo/dashboard').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
