import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { UserService } from '../user.service';

@Component({
  selector: 'wow-spedoo-add-profit-partner',
  templateUrl: './add-profit-partner.component.html',
  styleUrls: ['./add-profit-partner.component.scss'],
})
export class AddProfitPartnerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub = new SubSink();
  user!: number;
  @Input() added = new BehaviorSubject<any>({});
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      profit: [0.0],
    });
  }

  ngOnInit() {
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
    const { profit } = this.form.value;

    this.userService.changeProfit(this.user, profit).subscribe(() => {
      this.OnSuccess();
    });
  }
  OnSuccess(): void {
    this.form.reset();
    this.added.next({ modal: false, user: this.user });
  }
}
