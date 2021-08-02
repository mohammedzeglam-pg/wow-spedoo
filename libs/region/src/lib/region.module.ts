import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCityComponent } from './add-city/add-city.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ShowComponent } from './show/show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@wow-spedoo/shared';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: 'add-city', component: AddCityComponent },
  { path: '', component: ShowComponent },
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    AddCityComponent,
    AddZoneComponent,
    AddLocationComponent,
    ShowComponent,
  ],
})
export class RegionModule {}
