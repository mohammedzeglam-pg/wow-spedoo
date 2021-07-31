import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';
import { ErrorToastComponent } from './error-toast/error-toast.component';

@NgModule({
  declarations: [
    TableComponent,
    NotFoundComponent,
    NotificationComponent,
    LoaderComponent,
    ErrorToastComponent,
  ],
  providers: [LoaderService],
  exports: [TableComponent, NotificationComponent, LoaderComponent, ErrorToastComponent],
  imports: [CommonModule],
})
export class SharedModule {}
