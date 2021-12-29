import { TestBed } from '@angular/core/testing';

import { AddPromoOfferService } from './promo-offer.service';

describe('AddPromoOfferService', () => {
  let service: AddPromoOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPromoOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
