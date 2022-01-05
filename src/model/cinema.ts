import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {GenericModel} from "./generic-model";

@HateoasResource('cinemas')
export class Cinema extends GenericModel<Cinema> {
  name: string
  address: string

  constructor(model?:Partial<Cinema>) {
    super(model);
  }
}
