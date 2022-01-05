import {Injectable} from '@angular/core';
import {CinemaHall} from "../../model/cinema-hall";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {AbstractService} from "./abstract-service";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaHallService extends AbstractService<CinemaHall> {

}
