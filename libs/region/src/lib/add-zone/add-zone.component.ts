import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { RegionService } from '../region.service';

@Component({
  selector: 'wow-spedoo-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss'],
})
export class AddZoneComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub = new SubSink();
  @Input() citySubject!: BehaviorSubject<any>;
  cities!: { id: number; name: string }[];
  @Output() added = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private regionService: RegionService) {
    this.form = fb.group({
      name: ['', Validators.required],
      cityId: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.sub.add(
      this.citySubject.subscribe((data: any) => {
        this.cities = data;
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.sub.add(
      this.regionService
        .addZone(this.form.value)
        .subscribe(() => this.OnSuccess()),
    );
    this.form.reset();
  }
  OnSuccess(): void {
    this.added.emit(true);
  }
}
