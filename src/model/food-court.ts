import {Cinema} from "./cinema";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('foodCourts')
export class FoodCourt extends Resource {
  id: number;
  name: string;
  checkoutNumber: number;
  cinema: Cinema;
}
