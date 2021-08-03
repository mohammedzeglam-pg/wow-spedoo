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
  modal: any = {
    city: false,
    zone: false,
    location: false,
  };
  data: AllRegionResponse[] = [];
  content: TableContent[] = [];
  citySubject = new BehaviorSubject<{ id: number; name: string }[]>([]);
  zoneSubject = new BehaviorSubject<
    { cityId: number; cityName: string; zoneId: number; zoneName: string }[]
  >([]);
  page = 1;
  take = 10;

  tableHeader = [
    { name: 'المدينة' },
    { name: 'المنطقة' },
    { name: 'السعر' },
    { name: 'خط الطول' },
    { name: 'خط العرض' },
  ];
  constructor(private regionService: RegionService) {}

  ngOnInit() {
    this.fetchRegionData();
  }
  onSuccess(data: AllRegionResponse[]): void {
    this.content = this.manipulateData(data);
    const zone = this.content.map((el) => {
      return {
        cityId: el.id,
        cityName: el.name,
        zoneId: el.zoneId,
        zoneName: el.zoneName,
      };
    });
    const city = data.map((el) => {
      return { id: el.id, name: el.name };
    });
    this.citySubject.next(city);
    this.zoneSubject.next(zone);
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
  fetchRegionData() {
    this.sub.add(
      this.regionService.getAllRegion().subscribe((data) => {
        this.onSuccess(data);
      }),
    );
  }

  manipulateData(data: AllRegionResponse[]) {
    const mem = <any>[];
    data.map((el) => {
      const rs: TableContent = <any>{};
      rs['id'] = el.id;
      rs['name'] = el.name;
      if (el.zones.length === 0) {
        mem.push(rs);
      }
      for (const zone of el?.zones) {
        rs['zoneId'] = zone.id;
        rs['zoneName'] = zone.name;
        rs['price'] = zone.price;
        if (zone.locations.length === 0) {
          mem.push(rs);
        }
        for (const location of zone?.locations) {
          rs['locationId'] = location.id;
          rs['lon'] = location?.lon;
          rs['lat'] = location?.lat;
          mem.push(rs);
        }
      }
    });
    return mem;
  }
  modalEvent(type: string) {
    this.modal[type] = false;
    this.fetchRegionData();
  }
}
