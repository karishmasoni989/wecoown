import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentingPbmsGroupComponent } from './update-renting-pbms-group.component';

describe('UpdateRentingPbmsGroupComponent', () => {
  let component: UpdateRentingPbmsGroupComponent;
  let fixture: ComponentFixture<UpdateRentingPbmsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRentingPbmsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRentingPbmsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
