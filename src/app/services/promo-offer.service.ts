import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {PromoOffer} from "../../model/promo-offer";

@Injectable({
  providedIn: 'root'
})
export class PromoOfferService {
  private promoOffers: Array<PromoOffer>;

  constructor() {
    this.promoOffers = new Array<PromoOffer>();

    const o1 = new PromoOffer();
    o1.name = "New Clients";
    o1.discount = 10;

    const o2 = new PromoOffer();
    o2.name = "Regular Clients";
    o2.discount = 15;

    this.promoOffers.push(o1, o2);
  }

  public getOffers(): Observable<PromoOffer[]> {
    return of(this.promoOffers)
  }

  public addOffer(offer: PromoOffer): Observable<PromoOffer> {
    this.promoOffers.push(offer);
    return of(offer);
  }
}
