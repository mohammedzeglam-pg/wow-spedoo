import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { UserService } from '../user.service';
import { phoneValidator } from '../phone.validator';
import { catchError, finalize, map } from 'rxjs/operators';
@Component({
  selector: 'wow-spedoo-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  isLoading = false;
  modalData = {
    message: '',
    state: false,
  };
  roles = [
    {
      key: 'admin',
      value: 'أدمن',
    },

    {
      key: 'manager',
      value: 'مدير',
    },

    {
      key: 'picker',
      value: 'فتى استلام',
    },

    {
      key: 'delivery',
      value: 'فتى توصيل',
    },
    {
      key: 'partner',
      value: 'شريك',
    },
  ];
  error = {
    message: '',
    state: false,
  };

  constructor(private userService: UserService, private fb: FormBuilder) {}
  createForm = this.fb.group({
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
    username: ['', Validators.required],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
  });

  onSubmit() {
    this.isLoading = true;
    this.userService
      .createUser(this.createForm.value)
      .pipe(
        map((data) => this.onSuccess(data)),
        catchError(async (err) => this.errorHandler(err)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }
  errorHandler({ error }: { error: any }) {
    let msg = '';
    for (const err of error.message) {
      msg += err + '\n';
    }
    this.error.message = msg;
    this.error.state = true;
  }
  onSuccess(data: any): any {
    this.modalData = {
      message: data.message,
      state: true,
    };
    this.createForm.reset();
  }

  asYouType() {
    const phone = this.createForm.get('phone')?.value;
    if (phone.substring(0, 3) === '218') {
      this.createForm.controls['phone'].setValue('');
    } else {
      const digit = phone.substring(0, 10);
      const formatter = new AsYouTypeFormatter('LY').inputDigit(digit);
      this.createForm.controls['phone'].setValue(formatter);
    }
  }

  showPassword() {
    const pass = document.getElementById('password') as HTMLInputElement;
    pass.type = pass?.type === 'password' ? 'text' : 'password';
  }
  deleteNotification() {
    this.error.state = false;
  }
}