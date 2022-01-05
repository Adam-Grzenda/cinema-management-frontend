import {map, Observable} from "rxjs";
import {HateoasResourceService, Resource, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Inject, inject, Injectable} from "@angular/core";
import {GenericModel} from "../../model/generic-model";


export abstract class GenericService<T extends GenericModel<T>> {


  constructor(
    protected resourceService: HateoasResourceService,
    private tConstructor: { new (m: T, ...args: unknown[]): T },
  ) {
  }

  getAll(): Observable<ResourceCollection<T>> {
    return this.resourceService.getCollection(T)
      .pipe(map((result) =>
        new this.tConstructor(result)));
  };

  public getOne(id: number): Observable<T> {
    // @ts-ignore
    return this.resourceService.getResource(T, id);
  }

  public add(object: T): Observable<T> {
    // @ts-ignore
    return this.resourceService.createResource(T, {body: object});
  }

  public update(object: T): Observable<T> {
    return this.resourceService.updateResource(object);
  }


  delete(object: T): Observable<T> {
    return this.resourceService.deleteResource(object);
  };

}
