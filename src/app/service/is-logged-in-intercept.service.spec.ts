import { TestBed } from '@angular/core/testing';

import { IsLoggedInInterceptService } from './is-logged-in-intercept.service';

describe('IsLoggedInInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsLoggedInInterceptService = TestBed.get(IsLoggedInInterceptService);
    expect(service).toBeTruthy();
  });
});
