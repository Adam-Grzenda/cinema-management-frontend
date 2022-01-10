import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromoOfferComponent } from './add-promo-offer.component';

describe('AddPromoOfferComponent', () => {
  let component: AddPromoOfferComponent;
  let fixture: ComponentFixture<AddPromoOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromoOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromoOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
