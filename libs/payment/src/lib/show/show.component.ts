import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentMethodResponse } from '@wow-spedoo/api-interfaces';
import { SubSink } from 'subsink';
import { PaymentService } from '../payment.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  page = 1;
  take = 10;
  sub = new SubSink();
  tableHeader: { name: string; title?: string }[] = [
    {
      name: 'طريقة الدفع',
    },
    {
      name: 'يستلم اموال',
    },
  ];
  content: PaymentMethodResponse[] = [];

  constructor(private paymentService: PaymentService) {}

  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      this.fetchPaymentData();
    }
  }

  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      this.fetchPaymentData();
    }
  }
  deletePayment(id: number) {
    console.log(id);
  }

  ngOnInit(): void {
    this.fetchPaymentData();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private fetchPaymentData() {
    this.sub.add(
      this.paymentService
        .getPayemntMethods({
          take: this.take,
          skip: this.page - 1,
        })
        .pipe(
          map((data) => {
            for (const ele of data) {
              if (ele.take_money === true) {
                ele.take_money = 'يأخد أموال';
              } else {
                ele.take_money = 'لا يؤخذ أموال';
              }
            }
            this.onSeccuess(data);
          }),
        )
        .subscribe(),
    );
  }
  onSeccuess(data: PaymentMethodResponse[]) {
    // this.content = [];
    this.content = data;
  }
}
