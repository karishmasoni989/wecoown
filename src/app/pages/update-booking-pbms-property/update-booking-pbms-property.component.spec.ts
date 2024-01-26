import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingPbmsPropertyComponent } from './update-booking-pbms-property.component';

describe('UpdateBookingPbmsPropertyComponent', () => {
  let component: UpdateBookingPbmsPropertyComponent;
  let fixture: ComponentFixture<UpdateBookingPbmsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBookingPbmsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookingPbmsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
