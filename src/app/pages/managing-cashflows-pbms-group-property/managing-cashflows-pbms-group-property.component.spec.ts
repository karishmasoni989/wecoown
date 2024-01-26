import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingCashflowsPbmsGroupPropertyComponent } from './managing-cashflows-pbms-group-property.component';

describe('ManagingCashflowsPbmsGroupPropertyComponent', () => {
  let component: ManagingCashflowsPbmsGroupPropertyComponent;
  let fixture: ComponentFixture<ManagingCashflowsPbmsGroupPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingCashflowsPbmsGroupPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingCashflowsPbmsGroupPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
