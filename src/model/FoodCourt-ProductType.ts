import {ProductType} from "./product-type";
import {FoodCourt} from "./food-court";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource("foodCourts_ProductTypes")
export class FoodCourtProductType extends Resource {
  storedUnitsCount: number;
  productType: ProductType;
  foodCourt: FoodCourt;
}
