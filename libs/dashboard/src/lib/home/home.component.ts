import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wow-spedoo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tableHeader: { name: string; title?: string }[] = [
    {
      name: 'ONP',
      title: 'رقم التوصيل من العميل',
    },
    {
      name: 'اسم العميل',
    },
    {
      name: 'اسم المستلم',
    },
    {
      name: 'السعر الاجمالي',
    },
    {
      name: 'سعر التوصيلة',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
