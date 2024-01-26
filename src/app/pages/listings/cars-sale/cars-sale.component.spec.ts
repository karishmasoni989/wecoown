import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSaleComponent } from './cars-sale.component';

describe('CarsSaleComponent', () => {
  let component: CarsSaleComponent;
  let fixture: ComponentFixture<CarsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
