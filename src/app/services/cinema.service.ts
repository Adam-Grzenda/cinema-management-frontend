import {Injectable} from '@angular/core';
import {Cinema} from "../../model/cinema";
import {GenericService} from "./generic-service";
import {HateoasResourceService} from "@lagoshny/ngx-hateoas-client";

@Injectable({
  providedIn: 'root'
})
export class CinemaService extends GenericService<Cinema> {

  constructor(private service:HateoasResourceService) {
    super(service, Cinema);
  }

}
