import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileCheck } from 'angular-file-validator';
import { SubSink } from 'subsink';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'wow-spedoo-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnDestroy {
  fileName = '...';
  sub = new SubSink();
  paymentForm = this.fb.group({
    name: ['', [Validators.required]],
    take_money: [false, Validators.required],
    image: [
      null,
      // {
      //   asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg'])],
      // },
    ],
  });
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private cd: ChangeDetectorRef,
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.paymentForm.get('name')?.value);
    formData.append('take_money', this.paymentForm.get('take_money')?.value);
    formData.append('image', this.paymentForm.get('image')?.value);
    this.sub.add(
      this.paymentService
        .createPaymentMethod(formData)
        .subscribe((data) => console.log(data)),
    );
  }
  onFileChanged(event: any) {
    const [file] = event.target.files;
    this.fileName = file.name;
    if (file) {
      this.paymentForm.patchValue({
        image: file,
      });
    }
    this.paymentForm.get('image')?.updateValueAndValidity();
    this.paymentForm.get('image')?.setValue(file);
  }
}
