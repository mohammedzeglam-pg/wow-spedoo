import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginCredential } from '@wow-spedoo/api-interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/internal/operators/map';
export const JWT_NAME = 'jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly helper = new JwtHelperService();
  constructor(private httpClient: HttpClient) {}

  login(loginCredential: {
    phone: string;
    password: string;
  }): Observable<LoginCredential> {
    return this.httpClient
      .post<LoginCredential>('/api/user/login', loginCredential)
      .pipe(
        map((user) => {
          localStorage.setItem(JWT_NAME, user.access_token);
          return user;
        }),
      );
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME) as string;
    return !this.helper.isTokenExpired(token);
  }
  getRole() {
    const token = localStorage.getItem(JWT_NAME) as string;
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken.role;
  }
}
