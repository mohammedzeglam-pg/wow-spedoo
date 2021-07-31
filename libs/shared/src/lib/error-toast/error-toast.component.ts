import { Component } from '@angular/core';
import { ErrorToast } from '@wow-spedoo/api-interfaces';
import { ErrorToastService } from '../error-toast.service';

@Component({
  selector: 'wow-spedoo-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss'],
})
export class ErrorToastComponent {
  errorSub = this.errorToastService.error;
  error: ErrorToast = {
    message: '',
    state: false,
    type: 'is-danger',
  };
  constructor(private errorToastService: ErrorToastService) {
    this.errorSub.subscribe((error) => (this.error = error));
  }
  delete() {
    this.error.state = false;
  }
}
