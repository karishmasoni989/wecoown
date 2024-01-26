import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksSaleComponent } from './artworks-sale.component';

describe('ArtworksSaleComponent', () => {
  let component: ArtworksSaleComponent;
  let fixture: ComponentFixture<ArtworksSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworksSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
