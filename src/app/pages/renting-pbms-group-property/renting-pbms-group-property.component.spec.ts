import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingPbmsGroupPropertyComponent } from './renting-pbms-group-property.component';

describe('RentingPbmsGroupPropertyComponent', () => {
  let component: RentingPbmsGroupPropertyComponent;
  let fixture: ComponentFixture<RentingPbmsGroupPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentingPbmsGroupPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentingPbmsGroupPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
