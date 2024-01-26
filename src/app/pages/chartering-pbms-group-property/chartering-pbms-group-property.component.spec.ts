import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharteringPbmsGroupPropertyComponent } from './chartering-pbms-group-property.component';

describe('CharteringPbmsGroupPropertyComponent', () => {
  let component: CharteringPbmsGroupPropertyComponent;
  let fixture: ComponentFixture<CharteringPbmsGroupPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharteringPbmsGroupPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharteringPbmsGroupPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
