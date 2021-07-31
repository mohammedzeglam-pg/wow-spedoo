import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorToast } from '@wow-spedoo/api-interfaces';
@Injectable({
  providedIn: 'root',
})
export class ErrorToastService {
  error = new Subject<ErrorToast>();
  show(err: ErrorToast) {
    this.error.next(err);
  }
}
