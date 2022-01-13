import {Injectable} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {FoodCourtService} from "./food-court.service";
import {FoodCourtProductTypeService} from "./food-court-product-type.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {

  private managerList: Array<TypeList>;

  constructor(
    private cinemaService: CinemaService,
    private foodCourtService: FoodCourtService,
    private foodCourtProductTypeService: FoodCourtProductTypeService
  ) {
    this.managerList = new Array<TypeList>();

    const halls: TypeList = new TypeList();
    halls.id = 11
    halls.type = 'manager'
    halls.name = "cinema hall"
    halls.addLink = ""
    halls.editLink = ""
    halls.service = this.cinemaService;

    const courts: TypeList = new TypeList();
    courts.id = 22
    courts.type = 'admin'
    courts.name = "food court"
    courts.addLink = "/manager/add-food-court"
    courts.editLink = "/manager/edit-food-court"
    courts.service = this.foodCourtService;

    const courts_types: TypeList = new TypeList();
    courts_types.id = 33;
    courts_types.type = 'manager'
    courts_types.name = 'Product types for food court'
    courts_types.addLink = "/manager/add-food-court-product-type"
    courts_types.editLink = ""
    courts_types.service = this.foodCourtProductTypeService;

    this.managerList.push(halls, courts, courts_types)

  }


  public getList(id: number): Observable<TypeList[]> {
    this.updateLists(id);
    return of(this.managerList);
  }

  public updateLists(id: number): void {

    for (let i = 0; i < this.managerList.length; i++) {
      this.managerList[i].service.getAllSub(id).subscribe(l => {
        this.managerList[i].objectList = l.resources
      })
    }


  }


  public updateList(id: number): void {
    this.managerList[id].service.getAll().subscribe(l => this.managerList[id].objectList = l.resources);
  }

}
