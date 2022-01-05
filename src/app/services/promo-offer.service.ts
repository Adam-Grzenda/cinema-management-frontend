import {Injectable} from '@angular/core';
import {PromoOffer} from "../../model/promo-offer";
import {GenericService} from "./generic-service";

@Injectable({
  providedIn: 'root'
})
export class PromoOfferService extends GenericService<PromoOffer> {

}
