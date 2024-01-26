import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionalShareListingComponent } from './fractional-share-listing.component';

describe('FractionalShareListingComponent', () => {
  let component: FractionalShareListingComponent;
  let fixture: ComponentFixture<FractionalShareListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractionalShareListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractionalShareListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
