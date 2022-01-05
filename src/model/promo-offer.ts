import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

export class MyResource extends Resource {

}

@HateoasResource('promoOffers')
export class PromoOffer extends MyResource {
  id: number;
  name: string;
  discount: number;
}

