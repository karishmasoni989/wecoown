import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSaleComponent } from './aircraft-sale.component';

describe('AircraftSaleComponent', () => {
  let component: AircraftSaleComponent;
  let fixture: ComponentFixture<AircraftSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
