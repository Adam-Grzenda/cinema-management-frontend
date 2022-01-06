import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('chairs')
export class Chair extends Resource{
  hallRow: number;
  hallColumn: number;
  chairType: string;
}
