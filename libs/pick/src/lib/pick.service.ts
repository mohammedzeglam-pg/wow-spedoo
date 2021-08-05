import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PickService {
  constructor(private httpClient: HttpClient) {}
  // getProducts() {
  //   return this.httpClient.get('/api/pick');
  // }
  getTasks() {
    return this.httpClient.get('/api/pick/task');
  }

  getZone() {
    return this.httpClient.get('/api/region');
  }
  getPicker(zoneId: number) {
    return this.httpClient.get('/api/pick/boy/' + zoneId);
  }
  getProducts() {
    return this.httpClient.get('/api/pick/product');
  }
}
