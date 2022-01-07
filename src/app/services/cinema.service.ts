import {Injectable} from '@angular/core';
import {Cinema} from "../../model/cinema";
import {Observable} from "rxjs";
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {CinemaHall} from "../../model/cinema-hall";

@Injectable({
  providedIn: 'root'
})
export class CinemaService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<Cinema>> {
    return this.resourceService.getCollection(Cinema);
  }

  public getOne(id: number): Observable<Cinema> {
    return this.resourceService.getResource(Cinema, id);
  }

  public add(cinema: Cinema): Observable<Cinema> {
    return this.resourceService.createResource(Cinema, {body: cinema});
  }

  public update(cinema: Cinema): Observable<Cinema> {
    return this.resourceService.updateResource(cinema);
  }

  public delete(cinema: Cinema): Observable<Cinema> {
    return this.resourceService.deleteResource(cinema);
  }

  public getAllSub(id: number): Observable<ResourceCollection<CinemaHall>> {
    return this.resourceService.searchCollection(CinemaHall, "findCinemaHallsByCinema_Id",
      {params: {
      id: id
    }})
  }

}
