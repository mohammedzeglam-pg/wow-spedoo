import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoneUserComponent } from './add-zone-user.component';

describe('AddZoneUserComponent', () => {
  let component: AddZoneUserComponent;
  let fixture: ComponentFixture<AddZoneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddZoneUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddZoneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
