import { Injectable } from '@angular/core';
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {FilmShow} from "../../model/film-show";
import {Observable} from "rxjs";
import {Chair} from "../../model/chair";

@Injectable({
  providedIn: 'root'
})
export class ChairService {

  constructor(
    private resourceService: HateoasResourceService
  ) { }

  getFreeChairsForScreening(screening: FilmShow): Observable<ResourceCollection<Chair>> {
    return this.resourceService.searchCollection(Chair, 'findFreeChairsForShow', {
      params: {
        filmShowId: screening.id
      }
    })
  }
}
