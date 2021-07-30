import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { SharedModule } from '@wow-spedoo/shared';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', component: ShowComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [CreateComponent, ShowComponent, EditComponent],
})
export class UserModule {}
