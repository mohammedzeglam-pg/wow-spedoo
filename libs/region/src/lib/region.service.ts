import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllRegionResponse } from '@wow-spedoo/api-interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private httpClient: HttpClient) {}

  getAllRegion(): Observable<AllRegionResponse[]> {
    return this.httpClient.get<AllRegionResponse[]>('/api/zone');
  }
  addCity(name: { name: string }) {
    return this.httpClient.post<void>('api/zone/city', name);
  }
  addZone(zone: { cityId: number; name: string }) {
    return this.httpClient.post('/api/zone/regoin', zone);
  }

  addManyLocation(value: any) {
    return this.httpClient.post('/api/zone/location/many', value);
  }
}
