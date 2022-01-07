import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ProductType} from "../../model/product-type";
import {ServiceInterface} from "./service-interface";
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Cinema} from "../../model/cinema";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService implements ServiceInterface {

  constructor(
    private resourceService: HateoasResourceService
  ) {
  }

  public getAll(): Observable<ResourceCollection<ProductType>> {
    return this.resourceService.getCollection(ProductType);
  }

  public getOne(id: number): Observable<ProductType> {
    return this.resourceService.getResource(ProductType, id);
  }

  public add(type: ProductType): Observable<ProductType> {
    return this.resourceService.createResource(ProductType, {body: type});
  }

  public update(type: ProductType): Observable<ProductType> {
    return this.resourceService.updateResource(type);
  }

  public delete(type: ProductType): Observable<ProductType> {
    return this.resourceService.deleteResource(type);
  }

  getAllSub(id: number): Observable<ResourceCollection<any>> {
    return of(new ResourceCollection());
  }

}
