import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ClientSegment} from "../../model/client-segment";
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class ClientSegmentService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<ClientSegment>> {
    return this.resourceService.getCollection(ClientSegment);
  }

  public getOne(id: number): Observable<ClientSegment> {
    return this.resourceService.getResource(ClientSegment, id);
  }

  public add(segment: ClientSegment): Observable<ClientSegment> {
    return this.resourceService.createResource(ClientSegment, {body: segment});
  }

  public update(segment: ClientSegment): Observable<ClientSegment> {
    return this.resourceService.updateResource(segment);
  }

  public delete(segment: ClientSegment): Observable<ClientSegment> {
    return this.resourceService.deleteResource(segment);
  }

}
