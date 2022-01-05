import {Observable} from "rxjs";
import {HateoasResourceService, Resource, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {inject, Injectable} from "@angular/core";


export abstract class AbstractService<ObjectType extends Resource> {

  protected resourceService: HateoasResourceService

  protected constructor(

  ) {
    this.resourceService = inject(HateoasResourceService);
  }

  getAll(): Observable<ResourceCollection<ObjectType>> {
    // @ts-ignore
    return this.resourceService.getCollection(ObjectType);
  };

  public getOne(id: number): Observable<ObjectType> {
    // @ts-ignore
    return this.resourceService.getResource(ObjectType, id);
  }

  public add(object: ObjectType): Observable<ObjectType> {
    // @ts-ignore
    return this.resourceService.createResource(ObjectType, {body: object});
  }

  public update(object: ObjectType): Observable<ObjectType> {
    return this.resourceService.updateResource(object);
  }



  delete(object: ObjectType): Observable<ObjectType> {
    return this.resourceService.deleteResource(object);
  };

}
