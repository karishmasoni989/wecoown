import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsesLivestockSaleComponent } from './horses-livestock-sale.component';

describe('HorsesLivestockSaleComponent', () => {
  let component: HorsesLivestockSaleComponent;
  let fixture: ComponentFixture<HorsesLivestockSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorsesLivestockSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsesLivestockSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
