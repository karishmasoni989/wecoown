import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPbmsGroupPropertyComponent } from './book-pbms-group-property.component';

describe('BookPbmsGroupPropertyComponent', () => {
  let component: BookPbmsGroupPropertyComponent;
  let fixture: ComponentFixture<BookPbmsGroupPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPbmsGroupPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPbmsGroupPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
