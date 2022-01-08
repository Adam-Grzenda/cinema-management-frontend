import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {CinemaHall} from "./cinema-hall";

@HateoasResource('chairs')
export class Chair extends Resource {
  id: number;
  hallRow: number;
  hallColumn: number;
  chairType: string;
  cinemaHall: CinemaHall;
}
