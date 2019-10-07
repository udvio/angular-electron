import { TestBed } from '@angular/core/testing';

import { OpenCaseService } from './open-case.service';

describe('OpenCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenCaseService = TestBed.get(OpenCaseService);
    expect(service).toBeTruthy();
  });
});
