import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryByNameComponent } from './category-by-name.component';

describe('CategoryByNameComponent', () => {
  let component: CategoryByNameComponent;
  let fixture: ComponentFixture<CategoryByNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryByNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
