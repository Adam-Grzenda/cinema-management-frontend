import {AbstractService} from "../app/services/abstract-service";
import {Resource} from "@lagoshny/ngx-hateoas-client";

export class AdminList {
  name: string;
  addLink: string;
  editLink: string;
  objectList: any[];
  service: AbstractService<Resource>;
}
