import {Cinema} from "./cinema";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('foodCourts')
export class FoodCourt extends Resource{
  id: number;
  checkoutNumber: number;
  cinema: Cinema;
}
