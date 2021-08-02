import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllRegionResponse } from '@wow-spedoo/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { RegionService } from '../region.service';

interface TableContent {
  id: number;
  name: string;
  zoneId: number;
  zoneName: string;
  price: number;
  locationId: number;
  lon: number;
  lat: number;
}
@Component({
  selector: 'wow-spedoo-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, OnDestroy {
  sub = new SubSink();
  modal = {
    city: false,
    zone: false,
    location: false,
  };
  data: AllRegionResponse[] = [];
  content: TableContent[] = [];
  citySubject = new BehaviorSubject<{ id: number; name: string }[]>([]);
  page = 1;
  take = 10;

  tableHeader = [{ name: 'المدينة' }, { name: 'المنطقة' }, { name: 'السعر' }];
  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.fetchRegionData();
  }
  onSuccess(data: AllRegionResponse[]): void {
    this.content = this.manipulateData(data);

    const city = data.map((el) => {
      return { id: el.id, name: el.name };
    });
    this.citySubject.next(city);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changePage(eve: { name: string; value: number }) {
    if (eve.name === 'page') {
      this.page = eve.value;
      this.fetchRegionData();
    }
  }

  changeTake(eve: EventTarget | null) {
    const take = parseInt((eve as HTMLInputElement)?.value);
    if (take >= 0) {
      this.take = take;
    } else {
      this.fetchRegionData();
    }
  }
  onCity(state: boolean) {
    this.modal.city = state;
  }
  onZone(state: boolean) {
    this.modal.zone = state;
  }
  fetchRegionData() {
    this.sub.add(
      this.regionService
        .getAllRegion()
        .subscribe((data) => this.onSuccess(data)),
    );
  }

  manipulateData(data: AllRegionResponse[]) {
    return data.map((el) => {
      const rs: TableContent = <any>{};
      rs['id'] = el.id;
      rs['name'] = el.name;
      for (const zone of el?.zones) {
        rs['zoneId'] = zone.id;
        rs['zoneName'] = zone.name;
        rs['price'] = zone.price;
        for (const location of zone?.locations) {
          rs['locationId'] = location.id;
          rs['lon'] = location?.lon;
          rs['lat'] = location?.lat;
        }
      }
      return rs;
    });
  }
}
