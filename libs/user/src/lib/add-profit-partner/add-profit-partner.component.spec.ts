import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfitPartnerComponent } from './add-profit-partner.component';

describe('AddProfitPartnerComponent', () => {
  let component: AddProfitPartnerComponent;
  let fixture: ComponentFixture<AddProfitPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfitPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfitPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
