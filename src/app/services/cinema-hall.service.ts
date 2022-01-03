import {Injectable} from '@angular/core';
import {CinemaHall} from "../../model/cinema-hall";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {ServiceInterface} from "./serviceInterface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService implements ServiceInterface {

  constructor(
    private cinemaService: CinemaService,
    private resourceService: HateoasResourceService
  ) {
  }


  public getAll(): Observable<ResourceCollection<CinemaHall>> {
    return this.resourceService.getCollection(CinemaHall);
  }

  public getHall(id: number): Observable<CinemaHall> {
    return this.resourceService.getResource(CinemaHall, id);
  }


  public addHall(cinemaHall: CinemaHall): Observable<CinemaHall> {
    return this.resourceService.createResource(CinemaHall, {body: cinemaHall});
  }

  delete(hall: CinemaHall): Observable<CinemaHall> {
    return this.resourceService.deleteResource(hall);
  }

}
