import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCharteringPbmsPropertyComponent } from './update-chartering-pbms-property.component';

describe('UpdateCharteringPbmsPropertyComponent', () => {
  let component: UpdateCharteringPbmsPropertyComponent;
  let fixture: ComponentFixture<UpdateCharteringPbmsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCharteringPbmsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCharteringPbmsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
