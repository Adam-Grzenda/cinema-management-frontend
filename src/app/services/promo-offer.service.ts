import {Injectable} from '@angular/core';
import {PromoOffer} from "../../model/promo-offer";
import {AbstractService} from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class PromoOfferService extends AbstractService<PromoOffer> {

}
