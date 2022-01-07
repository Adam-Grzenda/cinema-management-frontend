import {Observable} from "rxjs";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";

export interface ServiceInterface {


  delete(object: any): Observable<any>;

  getAll(): Observable<ResourceCollection<any>>;

  getAllSub(id: number): Observable<ResourceCollection<any>>;

}
