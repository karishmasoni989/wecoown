import { TestBed } from '@angular/core/testing';

import { GoogletranslateService } from './googletranslate.service';

describe('GoogletranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogletranslateService = TestBed.get(GoogletranslateService);
    expect(service).toBeTruthy();
  });
});
