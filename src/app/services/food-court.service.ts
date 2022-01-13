import {Injectable} from '@angular/core';
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Observable, of} from "rxjs";
import {FoodCourt} from "../../model/food-court";

@Injectable({
  providedIn: 'root'
})
export class FoodCourtService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<FoodCourt>> {
    return this.resourceService.getCollection(FoodCourt);
  }

  public getOne(id: number): Observable<FoodCourt> {
    return this.resourceService.getResource(FoodCourt, id);
  }

  public add(foodCourt: FoodCourt): Observable<FoodCourt> {
    return this.resourceService.createResource(FoodCourt, {body: foodCourt});
  }

  public update(foodCourt: FoodCourt): Observable<FoodCourt> {
    return this.resourceService.updateResource(foodCourt);
  }

  delete(foodCourt: FoodCourt): Observable<FoodCourt> {
    return this.resourceService.deleteResource(foodCourt);
  }

  getByCinemaId(id: number): Observable<ResourceCollection<FoodCourt>> {
    return this.resourceService.searchCollection(FoodCourt, 'getAllByCinema_Id', {
      params: {
        id: id,
      }
    })
  }

  getAllSub(id: number): Observable<ResourceCollection<any>> {
    return of(new ResourceCollection());
  }

}
