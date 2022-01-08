import {Injectable} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {ServiceInterface} from "./service-interface";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {FoodCourtService} from "./food-court.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {

  private managerList: Array<TypeList>;
  private serviceList: Array<ServiceInterface>;

  constructor(
    private cinemaService: CinemaService,
    private foodCourtService: FoodCourtService
  ) {
    this.managerList = new Array<TypeList>();
    this.serviceList = new Array<ServiceInterface>();

    this.serviceList.push(cinemaService, foodCourtService)

    const halls: TypeList = new TypeList();
    halls.id = 1
    halls.type = 'manager'
    halls.name = "cinema halls"
    halls.addLink = ""
    halls.editLink = ""
    halls.service = this.cinemaService;

    const courts: TypeList = new TypeList();
    courts.id = 2
    courts.type = 'admin'
    courts.name = "food courts"
    courts.addLink = "/manager/add-food-court"
    courts.editLink = "/manager/edit-food-court"
    courts.service = this.foodCourtService;

    this.managerList.push(halls, courts)

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

    for (let i = 0; i < this.serviceList.length; i++) {
      this.serviceList[i].getAllSub(id).subscribe(l => {
        console.log(l)
        this.managerList[i].objectList = l.resources
      })
    }
  }


  public updateList(id: number): void {
    this.serviceList[id].getAll().subscribe(l => this.managerList[id].objectList = l.resources);
  }

}
