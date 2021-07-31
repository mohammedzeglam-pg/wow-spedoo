import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'libs/shared/src/lib/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@wow-spedoo/auth').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@wow-spedoo/dashboard').then((m) => m.DashboardModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
