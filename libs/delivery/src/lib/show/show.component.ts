import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent {
  sub = new SubSink();
  tableHeader = [
    { name: 'DTN', title: 'رقم التوصيل' },
    { name: 'عدد المستلمين' },
    { name: 'عدد القطع' },
    { name: 'فتى التوصيل' },
    { name: 'زمن التوصيل' },
    { name: 'الأحداث' },
  ];
  page = 1;
  take = 10;

  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      // this.fetchOrderData();
    }
  }

  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      // this.fetchOrderData();
    }
  }
}
