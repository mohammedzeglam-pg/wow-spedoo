import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, UserResponse } from '@wow-spedoo/api-interfaces';
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
    return this.httpClient.get<{ data: UserResponse[] }>('api/user' + link, {
      params: pagination,
    });
  }

  deleteUser(id: number) {
    return this.httpClient.delete<Message>('/api/user/' + id);
  }
}
