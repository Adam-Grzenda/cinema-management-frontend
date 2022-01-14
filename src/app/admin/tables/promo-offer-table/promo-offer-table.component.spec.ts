import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoOfferTableComponent } from './promo-offer-table.component';

describe('PromoOfferTableComponent', () => {
  let component: PromoOfferTableComponent;
  let fixture: ComponentFixture<PromoOfferTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoOfferTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoOfferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
