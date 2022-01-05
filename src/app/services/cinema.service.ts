import {Injectable} from '@angular/core';
import {Cinema} from "../../model/cinema";
import {AbstractService} from "./abstract-service";
import {HateoasResourceService} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class CinemaService extends AbstractService<Cinema> {
  constructor() {
    super();
  }
}
