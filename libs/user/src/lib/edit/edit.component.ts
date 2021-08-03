import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { map } from 'rxjs/internal/operators/map';
import { phoneValidator } from '../phone.validator';
import { UserService } from '../user.service';
import { SubSink } from 'subsink';
import { UserResponse } from '@wow-spedoo/api-interfaces';
@Component({
  selector: 'wow-spedoo-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  modalData = {
    message: '',
    state: false,
  };

  editForm = this.fb.group({
    phone: ['', [phoneValidator(), Validators.required]],
    username: [''],
    lastname: [''],
    firstname: [''],
    email: ['', [Validators.email]],
    is_allowed: [''],
  });
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.sub.add(
      this.userService
        .userInfo(id)
        .pipe(map((data) => this.fillTable(data)))
        .subscribe(),
    );
  }
  fillTable(data: UserResponse) {
    this.editForm.patchValue(data);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSubmit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.sub.add(
      this.userService
        .updateUser(id, this.editForm.value)
        .pipe(map((data) => this.onSuccess(data)))
        .subscribe(),
    );
  }
  onSuccess(data: any): void {
    this.modalData = {
      message: data.message,
      state: true,
    };
    this.router.navigate(['/dashboard/user/']);
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
}
