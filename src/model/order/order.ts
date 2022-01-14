import {FoodCourtProduct} from "../FoodCourtProduct";
import {Chair} from "../chair";

export class Order {
  chairs: Array<Chair>;
  foodProducts: Array<FoodCourtProduct>;
  filmShowId: number;
}
