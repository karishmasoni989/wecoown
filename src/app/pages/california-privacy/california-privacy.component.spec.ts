import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliforniaPrivacyComponent } from './california-privacy.component';

describe('CaliforniaPrivacyComponent', () => {
  let component: CaliforniaPrivacyComponent;
  let fixture: ComponentFixture<CaliforniaPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaliforniaPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliforniaPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
