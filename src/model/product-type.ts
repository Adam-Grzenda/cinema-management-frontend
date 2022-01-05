import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource("productTypes")
export class ProductType extends Resource{
  id:number;
  name: string;
  unit: string;
  amount: number;
}
