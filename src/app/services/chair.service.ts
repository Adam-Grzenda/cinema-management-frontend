import { Injectable } from '@angular/core';
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {FilmShow} from "../../model/film-show";
import {Observable, of} from "rxjs";
import {Chair} from "../../model/chair";
import {ServiceInterface} from "./service-interface";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class ChairService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) { }

  public getAll(): Observable<ResourceCollection<Chair>> {
    return this.resourceService.getCollection(Chair);
  }

  public getOne(id: number): Observable<Chair> {
    return this.resourceService.getResource(Chair, id);
  }

  public add(chair: Chair): Observable<Chair> {
    return this.resourceService.createResource(Chair, {body: chair});
  }

  public update(chair: Chair): Observable<Chair> {
    return this.resourceService.updateResource(chair);
  }

  public delete(chair: Chair): Observable<Chair> {
    return this.resourceService.deleteResource(chair);
  }

  public getAllSub(id: number): Observable<ResourceCollection<any>> {
    return of(new ResourceCollection());
  }

  getFreeChairsForScreening(screening: FilmShow): Observable<ResourceCollection<Chair>> {
    return this.resourceService.searchCollection(Chair, 'findFreeChairsForShow', {
      params: {
        filmShowId: screening.id
      }
    })
  }
}
