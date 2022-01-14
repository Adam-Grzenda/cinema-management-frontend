import {FoodCourtProduct} from "../FoodCourtProduct";
import {Chair} from "../chair";
import {PromoOffer} from "../promo-offer";

export class Order {
  chairs: Array<Chair>;
  foodProducts: Array<FoodCourtProduct>;
  filmShowId: number;
  promoOfferId: number;
}
