import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { AuthService, JWT_NAME } from '../auth.service';
import { phoneValidator } from './phone.validator';
import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginCredential } from '@wow-spedoo/api-interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'wow-spedoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  error = {
    message: '',
    state: false,
  };
  isLoading = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  loginForm = this.fb.group({
    phone: ['', [phoneValidator(), Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        ),
      ],
    ],
  });

  asYouType() {
    const phone = this.loginForm.get('phone')?.value;
    if (phone.substring(0, 3) === '218') {
      this.loginForm.controls['phone'].setValue('');
    } else {
      const digit = phone.substring(0, 10);
      const formatter = new AsYouTypeFormatter('LY').inputDigit(digit);
      this.loginForm.controls['phone'].setValue(formatter);
    }
  }
  onSubmit() {
    this.error.state = false;
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(
        map((data) => this.OnSuccess(data)),
        catchError((err) => of(this.errorHandler(err))),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

  errorHandler({ error: err }: { error: any }) {
    this.error = {
      message: err?.message,
      state: true,
    };
  }

  OnSuccess(data: LoginCredential) {
    const helper = new JwtHelperService();
    const myRawToken = localStorage.getItem(JWT_NAME) || undefined;
    const decodedToken = helper.decodeToken(myRawToken);
  }
  showPassword() {
    const pass = document.getElementById('password') as HTMLInputElement;
    pass.type = pass?.type === 'password' ? 'text' : 'password';
  }
  deleteNotification() {
    this.error.state = false;
  }
}
