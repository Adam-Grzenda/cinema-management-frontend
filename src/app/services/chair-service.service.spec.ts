import { TestBed } from '@angular/core/testing';

import { ChairServiceService } from './chair-service.service';

describe('ChairServiceService', () => {
  let service: ChairServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChairServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
