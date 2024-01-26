import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IAmSellerComponent } from './i-am-seller.component';

describe('IAmSellerComponent', () => {
  let component: IAmSellerComponent;
  let fixture: ComponentFixture<IAmSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IAmSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IAmSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
