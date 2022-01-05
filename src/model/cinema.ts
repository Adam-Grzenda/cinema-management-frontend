import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('cinemas')
export class Cinema extends Resource {
  id: number
  name: string
  address: string
}
