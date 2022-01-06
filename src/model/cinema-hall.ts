import {Cinema} from "./cinema";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('cinemaHalls')
export class CinemaHall extends Resource {
  id: number;
  number: number;
  type: string;
  cinema: Cinema;


}
