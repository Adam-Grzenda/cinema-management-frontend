import { TestBed } from '@angular/core/testing';

import { ClientSegmentService } from './client-segment.service';

describe('ClientSegmentService', () => {
  let service: ClientSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
