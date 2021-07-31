import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ErrorToastService } from '@wow-spedoo/shared';
import { retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorToastService: ErrorToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          this.errorToastService.show({ message: '', state: false, type: '' });
        }
      }),
      retry(1),
      catchError((response): Observable<any> => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 403:
              this.errorToastService.show({
                message: 'غير مصرح بالدخول',
                state: true,
                type: 'is-danger',
              });
              break;
            case 404:
              this.errorToastService.show({
                message: 'غير موجود',
                state: true,
                type: 'is-warning',
              });
              break;
            case 409:
              this.errorToastService.show({
                message: 'حدث غير متوقع',
                state: true,
                type: 'is-warning',
              });
              break;
            case 500:
              this.errorToastService.show({
                message: 'server down',
                state: true,
                type: 'is-warning',
              });
              break;
            default:
              this.errorToastService.show({
                message: 'unhandled exception',
                state: true,
                type: 'is-danger',
              });
          }
        }

        return throwError(response);
      }),
    );
  }
}
