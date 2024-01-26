import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostingComponent } from './all-posting.component';

describe('AllPostingComponent', () => {
  let component: AllPostingComponent;
  let fixture: ComponentFixture<AllPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
