import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeZoneInterface } from '@wow-spedoo/angular-interface';
import {
  AllRegionResponse,
  Message,
  UserResponse,
} from '@wow-spedoo/api-interfaces';
import { identity } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  updateUser(id: number, updateUser: any) {
    return this.httpClient.patch('api/user/update/' + id, updateUser);
  }
  constructor(private httpClient: HttpClient) {}

  createUser(user: any) {
    return this.httpClient.post('api/user/create', user);
  }

  userInfo(id: number) {
    return this.httpClient.get<UserResponse>('api/user/' + id);
  }

  fetchUsers(link: string, pagination: { take: number; skip: number }) {
    return this.httpClient.get<UserResponse[]>('api/user' + link, {
      params: pagination,
    });
  }

  deleteUser(id: number) {
    return this.httpClient.delete<Message>('/api/user/' + id);
  }

  getZone() {
    return this.httpClient.get<EmployeeZoneInterface[]>('/api/zone');
  }
  boyInfo(id: number) {
    return this.httpClient.get('api/user/boy' + id);
  }

  getAllRegion(): Observable<AllRegionResponse[]> {
    return this.httpClient.get<AllRegionResponse[]>('/api/zone');
  }

  updateBoyZone(zoneId: number, id: number) {
    return this.httpClient.patch('/api/user/boy/' + id, { zoneId: zoneId });
  }
  changeProfit(id: number, profit: number) {
    return this.httpClient.patch('/api/user/profit/' + id, {
      profit: profit,
    });
  }
}
