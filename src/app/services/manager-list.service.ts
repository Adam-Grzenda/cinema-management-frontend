import {Injectable} from '@angular/core';
import {TypeList} from "../../model/type-list";
import {Observable, of} from "rxjs";
import {CinemaService} from "./cinema.service";
import {FoodCourtService} from "./food-court.service";
import {FoodCourtProductTypeService} from "./food-court-product-type.service";
import {FilmShowService} from "./film-show.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {

  private managerList: Array<TypeList>;

  constructor(
    private cinemaService: CinemaService,
    private foodCourtService: FoodCourtService,
    private foodCourtProductTypeService: FoodCourtProductTypeService,
    private filmShowService:FilmShowService
  ) {
    this.managerList = new Array<TypeList>();

    const halls: TypeList = new TypeList();
    halls.id = 11;
    halls.type = 'manager';
    halls.name = "cinema hall";
    halls.service = this.cinemaService;

    const courts: TypeList = new TypeList();
    courts.id = 22;
    courts.type = 'admin';
    courts.name = "food court";
    courts.service = this.foodCourtService;

    const courts_types: TypeList = new TypeList();
    courts_types.id = 33;
    courts_types.type = 'manager';
    courts_types.name = 'Product types for food court';
    courts_types.service = this.foodCourtProductTypeService;

    const shows: TypeList = new TypeList();
    shows.id = 44;
    shows.type = 'admin';
    shows.name = 'film show';
    shows.service = this.filmShowService;

    this.managerList.push(halls, courts, courts_types, shows)
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
