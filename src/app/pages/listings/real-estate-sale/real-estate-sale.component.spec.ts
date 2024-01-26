import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateSaleComponent } from './real-estate-sale.component';

describe('RealEstateSaleComponent', () => {
  let component: RealEstateSaleComponent;
  let fixture: ComponentFixture<RealEstateSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstateSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
