import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '@wow-spedoo/shared';
import { HttpClientModule } from '@angular/common/http';
export const routes: Routes = [{ path: '', component: ProfileComponent }];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [ProfileComponent],
})
export class StoreModule {}
