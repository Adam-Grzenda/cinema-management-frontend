import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource("filmShows")
export class FilmShow extends Resource {
  id: number;
  date: string;
}
