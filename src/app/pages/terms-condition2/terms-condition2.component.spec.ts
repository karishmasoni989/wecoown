import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCondition2Component } from './terms-condition2.component';

describe('TermsCondition2Component', () => {
  let component: TermsCondition2Component;
  let fixture: ComponentFixture<TermsCondition2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsCondition2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsCondition2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
