import {Injectable} from '@angular/core';
import {CinemaHall} from "../../model/cinema-hall";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<CinemaHall>> {
    return this.resourceService.getCollection(CinemaHall);
  }

  public getOne(id: number): Observable<CinemaHall> {
    return this.resourceService.getResource(CinemaHall, id);
  }

  public add(cinemaHall: CinemaHall): Observable<CinemaHall> {
    return this.resourceService.createResource(CinemaHall, {body: cinemaHall});
  }

  public update(hall: CinemaHall): Observable<CinemaHall> {
    return this.resourceService.updateResource(hall);
  }

  delete(hall: CinemaHall): Observable<CinemaHall> {
    return this.resourceService.deleteResource(hall);
  }

}
