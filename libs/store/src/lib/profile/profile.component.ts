import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { SubSink } from 'subsink';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerResponse } from '@wow-spedoo/angular-interface';
import { phoneValidator } from '../phone.validator';
import { AsYouTypeFormatter } from 'google-libphonenumber';
@Component({
  selector: 'wow-spedoo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  sub = new SubSink();
  partner!: PartnerResponse;
  addSupplier = false;
  page = 1;
  form!: FormGroup;
  tableHeader = [
    { name: 'المعرف' },
    { name: 'الاسم' },
    { name: 'رقم الهاتف' },
    {
      name: 'خط الطول',
    },
    {
      name: 'خط العرض',
    },
    {
      name: 'المنطقة',
    },
  ];

  constructor(private stroeService: StoreService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchData();
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [phoneValidator(), Validators.required]],
      lon: ['', [Validators.required]],
      lat: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.sub.add(
      this.stroeService.addSupplieer(this.form.value).subscribe(() => {
        this.form.reset();
        this.fetchData;
        this.addSupplier = false;
      }),
    );
  }

  asYouType() {
    const phone = this.form.get('phone')?.value;
    if (phone.substring(0, 3) === '218') {
      this.form.controls['phone'].setValue('');
    } else {
      const digit = phone.substring(0, 10);
      const formatter = new AsYouTypeFormatter('LY').inputDigit(digit);
      this.form.controls['phone'].setValue(formatter);
    }
  }
  fetchData() {
    this.sub.add(
      this.stroeService.getStoreInfo().subscribe((data) => {
        this.partner = data;
      }),
    );
  }
}
