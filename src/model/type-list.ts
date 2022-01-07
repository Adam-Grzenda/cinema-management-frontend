import {ServiceInterface} from "../app/services/service-interface";

export class TypeList {
  id: number;
  type: string = 'admin';
  name: string;
  addLink: string;
  editLink: string;
  objectList: any[];
  service: ServiceInterface;
}
