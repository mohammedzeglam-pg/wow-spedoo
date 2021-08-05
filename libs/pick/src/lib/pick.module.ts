import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@wow-spedoo/shared';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
export const routes: Routes = [{ path: '', component: ShowComponent }];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [ShowComponent, AddComponent],
})
export class PickModule {}
