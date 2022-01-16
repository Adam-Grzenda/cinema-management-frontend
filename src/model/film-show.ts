import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {CinemaHall} from "./cinema-hall";
import {Film} from "./film";

@HateoasResource("filmShows")
export class FilmShow extends Resource {
  id: number;
  date: string;
  type: string;
  cinemaHall: CinemaHall;
  film: Film;
}
