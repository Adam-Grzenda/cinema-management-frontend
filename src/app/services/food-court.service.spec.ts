import { TestBed } from '@angular/core/testing';

import { FoodCourtService } from './food-court.service';

describe('FoodCourtService', () => {
  let service: FoodCourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
