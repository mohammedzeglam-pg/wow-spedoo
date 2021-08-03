import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  fetchOrderData(pagination: any) {
    return this.httpClient.get('/api/order', { params: pagination });
  }
}
