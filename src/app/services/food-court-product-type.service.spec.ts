import { TestBed } from '@angular/core/testing';

import { FoodCourtProductTypeService } from './food-court-product-type.service';

describe('FoodCourtProductTypeService', () => {
  let service: FoodCourtProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCourtProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
