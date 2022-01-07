import { Injectable } from '@angular/core';
import {TypeList} from "../../model/type-list";
import {ServiceInterface} from "./service-interface";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {

  private managerList: Array<TypeList>;
  private serviceList: Array<ServiceInterface>;

  constructor(
    private cinemaService: CinemaService,
  ) {
    this.managerList = new Array<TypeList>();
    this.serviceList = new Array<ServiceInterface>();

    this.serviceList.push(cinemaService)

    const halls: TypeList = new TypeList();
    halls.id = 1
    halls.type = 'manager'
    halls.name = "cinema halls"
    halls.addLink = ""
    halls.editLink = ""
    halls.service = this.cinemaService;

    this.managerList.push(halls)

  }


  public getList(id: number): Observable<TypeList[]> {
    this.updateLists(id);
    return of(this.managerList);
  }

  public updateLists(id: number): void {

    this.serviceList[0].getAllSub(id).subscribe(l => {
      console.log(l)
      this.managerList[0].objectList = l.resources
    })
  }


  public updateList(id: number): void {
    this.serviceList[id].getAll().subscribe(l => this.managerList[id].objectList = l.resources);
  }

}
