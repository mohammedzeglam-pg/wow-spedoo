import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SubSink } from 'subsink';
import { UserService } from '../user.service';

@Component({
  selector: 'wow-spedoo-add-zone-user',
  templateUrl: './add-zone-user.component.html',
  styleUrls: ['./add-zone-user.component.scss'],
})
export class AddZoneUserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub = new SubSink();
  user!: number;
  cities!: {
    id: number;
    name: string;
    zones: { id: number; name: string }[];
  }[];
  zones!: { id: number; name: string }[];
  @Input() added = new BehaviorSubject<any>({});
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      cityId: [''],
      zoneId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.sub.add(
      this.userService.getAllRegion().subscribe((data) => (this.cities = data)),
    );
    this.sub.add(
      this.form.valueChanges.subscribe((el) => {
        for (const city of this.cities) {
          if (parseInt(el.cityId) === city.id) {
            this.zones = city.zones;
          }
        }
      }),
    );
    this.sub.add(
      this.added.subscribe((data) => {
        this.user = data.user;
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    const { zoneId } = this.form.value;
    this.userService.updateBoyZone(zoneId, this.user).subscribe(() => {
      this.OnSuccess();
    });
  }
  OnSuccess(): void {
    this.added.next({ modal: false, user: this.user });
  }
}
