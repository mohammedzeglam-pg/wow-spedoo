import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
export const authRoutes: Route[] = [];
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {}
