import {Resource} from "@lagoshny/ngx-hateoas-client";

export abstract class GenericModel<T> extends Resource {
  public id?: number;

  constructor(model?: Partial<T>) {
    super();

    if (model) {
      Object.assign(this, model);
    }
  }
}
