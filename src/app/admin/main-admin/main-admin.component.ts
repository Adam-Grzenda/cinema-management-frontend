import {Component, OnInit} from '@angular/core';
import {AdminListService} from "../../services/admin-list.service";
import {AdminList} from "../../../model/admin-list";
import {FilmService} from "../../services/film.service";
import {Film} from "../../../model/film";
import {CinemaService} from "../../services/cinema.service";
import {Cinema} from "../../../model/cinema";
import {CinemaHall} from "../../../model/cinema-hall";
import {Advertisement} from "../../../model/advertisement";
import {PromoOffer} from "../../../model/promo-offer";
import {ClientSegment} from "../../../model/client-segment";
import {ProductType} from "../../../model/product-type";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  list: AdminList[] = [];

  constructor(
    private adminListService: AdminListService,
  ) {
  }

  ngOnInit(): void {
    this.getList();
  }


  getList(): void {
    this.adminListService.getList().subscribe(list => this.list = list);
  }


  getName(item: any): string {
    switch (item.constructor) {
      case Cinema:
      case PromoOffer:
      case ClientSegment:
      case ProductType:
        return item.name;

      case CinemaHall:
        return "Hall nr: " + item.number + " Cinema: " + item.cinema.name;

      case Film:
        return item.title;

      case Advertisement:
        return "Advertisement of " + item.companyName;


      default:
        return "Unknown"
    }
  }

}
