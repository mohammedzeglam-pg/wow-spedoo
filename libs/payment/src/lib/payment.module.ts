import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ShowComponent } from './show/show.component';
import { SharedModule } from '@wow-spedoo/shared';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFileValidatorLibModule } from 'angular-file-validator';

const routes: Routes = [
  { path: '', component: ShowComponent },
  { path: 'create', component: AddComponent },
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgFileValidatorLibModule,
    ReactiveFormsModule,
  ],
  declarations: [AddComponent, ShowComponent],
})
export class PaymentModule {}
