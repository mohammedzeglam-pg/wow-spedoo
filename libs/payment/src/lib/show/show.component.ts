import { Component } from '@angular/core';

@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  page = 1;
  take = 10;
  tableHeader: { name: string; title?: string }[] = [
    {
      name: 'طريقة الدفع',
    },
    {
      name: 'يستلم اموال',
    },
  ];
}
