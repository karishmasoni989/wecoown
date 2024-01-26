import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IAmBuyerComponent } from './i-am-buyer.component';

describe('IAmBuyerComponent', () => {
  let component: IAmBuyerComponent;
  let fixture: ComponentFixture<IAmBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IAmBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IAmBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
