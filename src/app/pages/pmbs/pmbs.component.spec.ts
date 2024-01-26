import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmbsComponent } from './pmbs.component';

describe('PmbsComponent', () => {
  let component: PmbsComponent;
  let fixture: ComponentFixture<PmbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
