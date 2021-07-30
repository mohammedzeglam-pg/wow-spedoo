import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { finalize } from 'rxjs/operators';
import { phoneValidator } from '../phone.validator';
import { UserService } from '../user.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'wow-spedoo-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  isLoading = false;
  modalData = {
    message: '',
    state: false,
  };
  error = {
    message: '',
    state: false,
  };

  editForm = this.fb.group({
    phone: ['', [phoneValidator(), Validators.required]],
    password: [
      '',
      [
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        ),
      ],
    ],
    username: [''],
    lastname: [''],
    firstname: [''],
    email: ['', [Validators.email]],
    role: [''],
  });
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.sub.add(this.userService.userInfo(id).subscribe());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSubmit() {
    this.isLoading = true;
    this.userService
      .createUser(this.editForm.value)
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
    this.editForm.reset();
  }

  asYouType() {
    const phone = this.editForm.get('phone')?.value;
    if (phone.substring(0, 3) === '218') {
      this.editForm.controls['phone'].setValue('');
    } else {
      const digit = phone.substring(0, 10);
      const formatter = new AsYouTypeFormatter('LY').inputDigit(digit);
      this.editForm.controls['phone'].setValue(formatter);
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
