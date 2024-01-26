import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPostingComponent } from './book-posting.component';

describe('BookPostingComponent', () => {
  let component: BookPostingComponent;
  let fixture: ComponentFixture<BookPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
