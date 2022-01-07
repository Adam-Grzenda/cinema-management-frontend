import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('promoOffers')
export class PromoOffer extends Resource{
  id: number;
  name: string;
  discount: number;
}
