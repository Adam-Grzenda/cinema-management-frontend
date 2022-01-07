import {PromoOffer} from "./promo-offer";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('clientSegments')
export class ClientSegment extends Resource {
  id: number;
  name: string;
  promoOffer: PromoOffer;
}
