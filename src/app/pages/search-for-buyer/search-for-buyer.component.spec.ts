import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForBuyerComponent } from './search-for-buyer.component';

describe('SearchForBuyerComponent', () => {
  let component: SearchForBuyerComponent;
  let fixture: ComponentFixture<SearchForBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchForBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
