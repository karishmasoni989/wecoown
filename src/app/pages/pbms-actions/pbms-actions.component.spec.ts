import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbmsActionsComponent } from './pbms-actions.component';

describe('PbmsActionsComponent', () => {
  let component: PbmsActionsComponent;
  let fixture: ComponentFixture<PbmsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbmsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbmsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
