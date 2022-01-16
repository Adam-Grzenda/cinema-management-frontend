import {Injectable} from '@angular/core';
import {Film} from "../../model/film";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Observable, of} from "rxjs";
import {FilmShow} from "../../model/film-show";
import {ServiceInterface} from "./service-interface";

@Injectable({
  providedIn: 'root'
})
export class FilmShowService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<FilmShow>> {
    return this.resourceService.getCollection(FilmShow);
  }

  public getOne(id: number): Observable<FilmShow> {
    return this.resourceService.getResource(FilmShow, id);
  }

  public add(filmShow: FilmShow): Observable<FilmShow> {
    return this.resourceService.createResource(FilmShow, {body: filmShow});
  }

  public update(filmShow: FilmShow): Observable<FilmShow> {
    return this.resourceService.updateResource(filmShow);
  }

  public delete(filmShow: FilmShow): Observable<FilmShow> {
    return this.resourceService.deleteResource(filmShow);
  }

  public getAllSub(id: number): Observable<ResourceCollection<any>> {
    return of(new ResourceCollection());
  }

  public getAllByCinemaId(id: number): Observable<ResourceCollection<FilmShow>> {
    return this.resourceService.searchCollection(FilmShow, 'findAllByCinemaHall_CinemaId', {
      params: {
        cinemaId: id
      }
    });
  }

  public getAllForFilm(film: Film): Observable<ResourceCollection<FilmShow>> {
    return this.resourceService.searchCollection(FilmShow, 'findFilmShowsByFilmId', {
      params: {
        filmId: film.id
      }
    });
  }

  public getAllForFilmFilteredByDate(film: Film, startDate: Date, endDate: Date) {
    return this.resourceService.searchCollection(FilmShow, 'findFilmShowsByDateBetweenAndFilmId', {
      params: {
        filmId: film.id,
        dateFrom: startDate.toISOString().split('T')[0],
        dateTo: endDate.toISOString().split('T')[0]
      }
    });
  }
}
