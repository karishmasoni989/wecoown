import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupReportComponent } from './user-signup-report.component';

describe('UserSignupReportComponent', () => {
  let component: UserSignupReportComponent;
  let fixture: ComponentFixture<UserSignupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignupReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
