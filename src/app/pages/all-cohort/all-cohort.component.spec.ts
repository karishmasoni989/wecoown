import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCohortComponent } from './all-cohort.component';

describe('AllCohortComponent', () => {
  let component: AllCohortComponent;
  let fixture: ComponentFixture<AllCohortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCohortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCohortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
