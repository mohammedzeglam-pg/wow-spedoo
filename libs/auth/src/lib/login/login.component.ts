import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { AuthService } from '../auth.service';
import { phoneValidator } from './phone.validator';
@Component({
  selector: 'wow-spedoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
    this.authService.login(this.loginForm.value);
  }
  showPassword() {
    const pass = document.getElementById('password') as HTMLInputElement;
    pass.type = pass?.type === 'password' ? 'text' : 'password';
  }
}
