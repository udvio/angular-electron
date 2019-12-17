import { TestBed } from '@angular/core/testing';

import { CaseIndexService } from './case-index.service';

describe('CaseIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseIndexService = TestBed.get(CaseIndexService);
    expect(service).toBeTruthy();
  });
});
