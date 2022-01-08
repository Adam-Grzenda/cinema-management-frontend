import {Injectable} from '@angular/core';
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Observable, of} from "rxjs";
import {FoodCourtProductType} from "../../model/FoodCourt-ProductType";
import {FoodCourt} from "../../model/food-court";

@Injectable({
  providedIn: 'root'
})
export class FoodCourtProductTypeService {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<FoodCourtProductType>> {
    return this.resourceService.getCollection(FoodCourtProductType);
  }

  public getOne(id: number): Observable<FoodCourtProductType> {
    return this.resourceService.getResource(FoodCourtProductType, id);
  }

  public add(foodCourtProductType: FoodCourtProductType): Observable<FoodCourtProductType> {
    return this.resourceService.createResource(FoodCourtProductType, {body: foodCourtProductType});
  }

  public update(foodCourtProductType: FoodCourtProductType): Observable<FoodCourtProductType> {
    return this.resourceService.updateResource(foodCourtProductType);
  }

  public delete(foodCourtProductType: FoodCourtProductType): Observable<FoodCourtProductType> {
    return this.resourceService.deleteResource(foodCourtProductType);
  }

  public getAllSub(id: number): Observable<ResourceCollection<FoodCourt>> {
    return this.resourceService.searchCollection(FoodCourt, 'getAllByCinema_Id', {
      params: {
        id: id,
      }
    })
  }

}
