import {GenericService} from "../app/services/generic-service";
import {Resource} from "@lagoshny/ngx-hateoas-client";

export class AdminList {
  name: string;
  addLink: string;
  editLink: string;
  objectList: any[];
  service: GenericService<Resource>;
}
