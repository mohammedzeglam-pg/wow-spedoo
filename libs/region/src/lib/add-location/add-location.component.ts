import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  EmailValidator,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SubSink } from 'subsink';
import { RegionService } from '../region.service';

@Component({
  selector: 'wow-spedoo-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent implements OnInit {
  oldCity!: number;
  sub = new SubSink();
  form!: FormGroup;
  locations!: FormArray;
  @Input() zoneData!: BehaviorSubject<any>;
  data!: {
    cityId: number;
    cityName: string;
    zoneId: number;
    zoneName: string;
  }[];
  zone!: { id: number; name: string }[];
  @Output() added = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private regionService: RegionService) {}

  initForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      zoneId: ['', Validators.required],
      location: this.fb.array([this.createItem()]),
    });
  }
  ngOnInit(): void {
    this.initForm();
    this.sub.add(
      this.zoneData.subscribe((data) => {
        const ids = new Set<number>();
        const arr = [];
        for (const elem of data) {
          if (!ids.has(elem.cityId)) {
            ids.add(elem.cityId);
            arr.push(elem);
          }
        }
        this.data = arr;
      }),
    );
    this.sub.add(
      this.form.valueChanges.subscribe((form) => {
        const newCity = parseInt(form.city);
        if (+newCity !== this.oldCity) {
          const filteredCity = this.data.filter((el) => el.cityId === +newCity);
          const arr = filteredCity.filter(
            (v, i, a) => a.findIndex((t) => t.cityId === v.cityId) === i,
          );
          this.zone = arr.map((el) => {
            return { id: el.zoneId, name: el.zoneName };
          });
        }
        this.oldCity = +form.city;
      }),
    );
  }
  get locationFormGroups() {
    return this.form.get('location') as FormArray;
  }
  onSubmit() {
    this.sub.add(
      this.regionService
        .addManyLocation(this.form.value)
        .subscribe(() => this.onSuccess()),
    );
  }
  onSuccess(): void {
    this.form.reset();
    this.added.next(false);
  }
  createItem(): FormGroup {
    return this.fb.group({
      lat: ['', Validators.required],
      lon: ['', Validators.required],
    });
  }

  addItem(): void {
    this.locations = this.form.get('location') as FormArray;
    this.locations.push(this.createItem());
  }
}
