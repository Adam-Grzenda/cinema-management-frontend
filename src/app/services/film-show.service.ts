import { Injectable } from '@angular/core';
import {Film} from "../../model/film";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Observable} from "rxjs";
import {FilmShow} from "../../model/film-show";

@Injectable({
  providedIn: 'root'
})
export class FilmShowService {

  constructor(
    private resourceService: HateoasResourceService
  ) { }

  public getAllForFilm(film: Film): Observable<ResourceCollection<FilmShow>> {
    return this.resourceService.searchCollection(FilmShow,'findFilmShowsByFilmId', {
      params: {
        filmId: film.id
      }
    });
  }

  public getAllForFilmFilteredByDate(film: Film, startDate: Date, endDate: Date) {
    console.log("Start date: " + startDate + " end date: " + endDate);
    return this.resourceService.searchCollection(FilmShow,'findFilmShowsByFilmId', {
      params: {
        filmId: film.id
      }
    });
  }
}
