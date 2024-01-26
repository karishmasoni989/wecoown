import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVouchersComponent } from './my-vouchers.component';

describe('MyVouchersComponent', () => {
  let component: MyVouchersComponent;
  let fixture: ComponentFixture<MyVouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVouchersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
