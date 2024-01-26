import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtsSaleComponent } from './yachts-sale.component';

describe('YachtsSaleComponent', () => {
  let component: YachtsSaleComponent;
  let fixture: ComponentFixture<YachtsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YachtsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
