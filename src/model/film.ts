import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('films')
export class Film extends Resource{
  id: number;
  title: string;
  director: string;
  duration: number;
  is3d: boolean;
  premiereDate: string;
  description: string;
  imageSource: string;
}
