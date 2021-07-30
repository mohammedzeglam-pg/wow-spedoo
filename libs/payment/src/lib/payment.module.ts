import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
import { SharedModule } from '@wow-spedoo/shared';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [{ path: '', component: ShowComponent }];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  declarations: [AddComponent, ShowComponent],
})
export class PaymentModule {}
