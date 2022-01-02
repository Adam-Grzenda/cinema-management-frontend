import {Injectable} from '@angular/core';
import {Cinema} from "../../model/cinema";
import {Observable, of} from "rxjs";
import {ServiceInterface} from "./serviceInterface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Film} from "../../model/film";

@Injectable({
  providedIn: 'root'
})
export class CinemaService implements ServiceInterface{


  public getCinemas(): Observable<ResourceCollection<Cinema>> {
    return this.resourceService.getCollection(Cinema);
  }

  public getCinema(id: number): Observable<Cinema> {
    return this.resourceService.getResource(Cinema, id);
  }

  public addCinema(cinema: Cinema): Observable<Cinema> {
    return this.resourceService.createResource(Cinema, {body: cinema})
  }


  public delete(cinema: Cinema): Observable<Cinema> {
    return this.resourceService.deleteResource(cinema);
  }

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }
}
