import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPropertySaleComponent } from './business-property-sale.component';

describe('BusinessPropertySaleComponent', () => {
  let component: BusinessPropertySaleComponent;
  let fixture: ComponentFixture<BusinessPropertySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPropertySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPropertySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
