import {Injectable} from '@angular/core';
import {Advertisement} from "../../model/advertisement";
import {Observable, of} from "rxjs";
import {FilmService} from "./film.service";
import {A} from "@angular/cdk/keycodes";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {CinemaHall} from "../../model/cinema-hall";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(
    private filmService: FilmService,
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<Advertisement>> {
    return this.resourceService.getCollection(Advertisement);
  }

  public getOne(id: number): Observable<Advertisement> {
    return this.resourceService.getResource(Advertisement, id);
  }


  public add(ad: Advertisement): Observable<Advertisement> {
    return this.resourceService.createResource(Advertisement, {body: ad});
  }

  public update(ad: Advertisement): Observable<Advertisement> {
    return this.resourceService.updateResource(ad);
  }

  delete(ad: Advertisement): Observable<Advertisement> {
    return this.resourceService.deleteResource(ad);
  }
}
