import { TestBed } from '@angular/core/testing';

import { ConsumeApiService } from './consume-api.service';

describe('ConsumeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumeApiService = TestBed.get(ConsumeApiService);
    expect(service).toBeTruthy();
  });
});
