import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { RegionService } from '../region.service';

@Component({
  selector: 'wow-spedoo-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnDestroy {
  form: FormGroup;
  sub = new SubSink();
  @Output() added = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private regionService: RegionService) {
    this.form = fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.sub.add(
      this.regionService
        .addCity(this.form.value)
        .subscribe(() => this.OnSuccess()),
    );
  }
  OnSuccess(): void {
    this.added.emit(true);
  }
}
