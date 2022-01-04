import {Component, Input, OnInit} from '@angular/core';
import {Cinema} from "../../../model/cinema";
import {PromoOffer} from "../../../model/promo-offer";
import {ClientSegment} from "../../../model/client-segment";
import {ProductType} from "../../../model/product-type";
import {CinemaHall} from "../../../model/cinema-hall";
import {Film} from "../../../model/film";
import {Advertisement} from "../../../model/advertisement";
import {AdminList} from "../../../model/admin-list";
import {Observable} from "rxjs";
import {AdminListService} from "../../services/admin-list.service";

@Component({
  selector: 'app-object-panel',
  templateUrl: './object-panel.component.html',
  styleUrls: ['./object-panel.component.css']
})
export class ObjectPanelComponent implements OnInit {

  @Input()
  item: any;

  @Input()
  type: AdminList;

  title: string;

  constructor(
    private service: AdminListService
  ) {
  }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    switch (this.item.constructor) {
      case Cinema:
      case PromoOffer:
      case ClientSegment:
      case ProductType:
        this.title = this.item.name;
        break;

      case CinemaHall:
        // @ts-ignore
        this.item.getRelation<Cinema>('cinema').subscribe(
          (i: { id: any; }) => {
            this.title = "Hall nr: " + this.item.number + " Cinema: " + i.id;
          }
        )



        break;

      case Film:
        this.title = this.item.title;
        break;

      case Advertisement:
        this.title = "Advertisement of " + this.item.companyName;
        break;


      default:
        this.title = "Unknown"
    }
  }

  delete() {
    console.log(this.item);
    let it: Observable<Cinema> = this.type.service.delete(this.item);
    //#TODO zwraca undefined
    it.subscribe(a => {
      console.log(a.name)
      this.service.updateLists();
    });


  }

}
