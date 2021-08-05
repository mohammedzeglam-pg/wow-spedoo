import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { PickService } from '../pick.service';

@Component({
  selector: 'wow-spedoo-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  tableHeader = [
    {
      name: 'المورد',
    },
    { name: 'عدد القطع' },
    { name: 'المكان' },
  ];
  products!: [];
  form!: FormGroup;
  constructor(private fb: FormBuilder, private pickService: PickService) {}

  ngOnInit(): void {
    this.initForm();
  }
  onSuccess(data: any) {
    console.log(data);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  initForm() {
    this.form = this.fb.group({
      zone: ['', Validators.required],
      picker: ['', Validators.required],
    });
  }
}
