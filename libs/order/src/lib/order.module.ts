import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { SharedModule } from '@wow-spedoo/shared';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
export const routes: Routes = [{ path: '', component: ShowComponent }];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  declarations: [ShowComponent],
})
export class OrderModule {}
