import { TestBed } from '@angular/core/testing';

import { CinemaHallService } from './cinema-hall.service';

describe('CinameHallService', () => {
  let service: CinemaHallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaHallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
