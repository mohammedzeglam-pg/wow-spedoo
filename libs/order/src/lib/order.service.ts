import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderShowResponse } from '@wow-spedoo/angular-interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  fetchOrderData(pagination: any) {
    return this.httpClient.get<OrderShowResponse[]>('/api/order', {
      params: pagination,
    });
  }
}
