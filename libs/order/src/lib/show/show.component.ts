import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { OrderService } from '../order.service';
import { OrderShowResponse } from '@wow-spedoo/angular-interface';
@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  page = 1;
  take = 10;
  orders!: OrderShowResponse[];
  tableHeader = [
    { name: 'ONFP', title: 'رقم الطلب من المنتج' },
    { name: 'مطلوب من' },
    { name: 'رقم الطلب' },
    { name: 'عدد القطع' },
    { name: 'المستلم' },
    { name: 'سعر التوصيلة' },
    { name: 'المدينة' },
    { name: 'طرق الدفع' },
    { name: 'أحداث' },
  ];

  constructor(private orderService: OrderService) {}

  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      this.fetchOrderData();
    }
  }

  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      this.fetchOrderData();
    }
  }

  ngOnInit() {
    this.fetchOrderData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchOrderData() {
    this.sub.add(
      this.orderService
        .fetchOrderData({ skip: this.page - 1, take: this.take })
        .subscribe((data) => {
          this.onSuccess(data);
        }),
    );
  }
  onSuccess(data: OrderShowResponse[]) {
    console.log(data);
    this.orders = data;
  }
}
