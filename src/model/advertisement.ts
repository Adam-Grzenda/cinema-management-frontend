import {Film} from "./film";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource("advertisements")
export class Advertisement extends Resource{
  id: number;
  companyName: string;
  duration: number;
  film: Film;
}
