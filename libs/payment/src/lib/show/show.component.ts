import { Component } from '@angular/core';
import { PaymentResponse } from '@wow-spedoo/api-interfaces';
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
  content: PaymentResponse[] = [];
  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      // this.fetchUserData();
    }
  }

  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      // this.fetchUserData();
    }
  }
  deletePayment(id: number) {
    console.log(id);
  }
}
