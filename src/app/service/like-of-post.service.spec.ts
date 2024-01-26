import { TestBed } from '@angular/core/testing';

import { LikeOfPostService } from './like-of-post.service';

describe('LikeOfPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikeOfPostService = TestBed.get(LikeOfPostService);
    expect(service).toBeTruthy();
  });
});
