import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PromoOffer} from "../../model/promo-offer";
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class PromoOfferService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<PromoOffer>> {
    return this.resourceService.getCollection(PromoOffer);
  }

  public getOne(id: number): Observable<PromoOffer> {
    return this.resourceService.getResource(PromoOffer, id);
  }

  public add(promoOffer: PromoOffer): Observable<PromoOffer> {
    return this.resourceService.createResource(PromoOffer, {body: promoOffer});
  }

  public update(promoOffer: PromoOffer): Observable<PromoOffer> {
    return this.resourceService.updateResource(promoOffer);
  }

  public delete(promoOffer: PromoOffer): Observable<PromoOffer> {
    return this.resourceService.deleteResource(promoOffer);
  }

}
