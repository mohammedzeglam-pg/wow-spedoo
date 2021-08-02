import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethodResponse } from '@wow-spedoo/api-interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  getPayemntMethods(pagination: {
    take: number;
    skip: number;
  }): Observable<PaymentMethodResponse[]> {
    return this.httpClient.get<PaymentMethodResponse[]>('/api/payment', {
      params: pagination,
    });
  }
  createPaymentMethod(paymentData: FormData) {
    return this.httpClient.post('/api/payment/create', paymentData);
  }
}
