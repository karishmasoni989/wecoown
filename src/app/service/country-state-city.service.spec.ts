import { TestBed } from '@angular/core/testing';

import { CountryStateCityService } from './country-state-city.service';

describe('CountryStateCityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryStateCityService = TestBed.get(CountryStateCityService);
    expect(service).toBeTruthy();
  });
});
