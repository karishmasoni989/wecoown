import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdFundingSaleComponent } from './crowd-funding-sale.component';

describe('CrowdFundingSaleComponent', () => {
  let component: CrowdFundingSaleComponent;
  let fixture: ComponentFixture<CrowdFundingSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdFundingSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdFundingSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
