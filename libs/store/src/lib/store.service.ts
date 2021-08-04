import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerResponse } from '@wow-spedoo/angular-interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getStoreInfo() {
    return this.httpClient.get<PartnerResponse>('/api/partner/profile');
  }
  addSupplieer(supplierData: any) {
    return this.httpClient.post('/api/supplier', supplierData);
  }
}
