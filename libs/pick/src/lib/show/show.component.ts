import { Component, OnDestroy, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  tableHeader = [
    {
      name: 'PTN',
    },
    {
      name: 'عدد المواقع',
    },
    {
      name: 'مجموع القطع',
    },
    {
      name: 'المكان',
    },
  ];
  constructor(private pickService: PickService) {}

  ngOnInit(): void {
    this.sub.sink = this.pickService
      .getTasks()
      .subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
