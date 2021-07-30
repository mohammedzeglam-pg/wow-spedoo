import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(user: any) {
    return this.httpClient.post('api/user/create', user);
  }

  userInfo(id: number) {
    return this.httpClient.get('api/user/' + id);
  }
}
