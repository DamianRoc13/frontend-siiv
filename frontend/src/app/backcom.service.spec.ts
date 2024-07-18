import { TestBed } from '@angular/core/testing';

import { BackcomService } from './backcom.service';

describe('BackcomService', () => {
  let service: BackcomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackcomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
