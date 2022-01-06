import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FilmShow} from "../../../model/film-show";
import {ChairService} from "../../services/chair.service";
import {Chair} from "../../../model/chair";
import {UserService} from "../../services/user.service";
import {User} from "../../../model/user";
import {FoodCourtProduct} from "../../../model/FoodCourtProduct";
import {Order} from "../../../model/order";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  public availableChairs: Array<Chair>; //tutaj są ładowane dostępne fotele dla danego seansu

  //Order elements
  public user: User; //Tutaj teraz jest zaciagany z user service placeholder - bede ogarnial auth po weekendzie pewnie
  public chairs: Array<Chair>; //TODO tutaj dodawać wybrane fotele + screening
  public pickedFoodCourtProducts: Array<FoodCourtProduct>; //TODO póki co tego nie implementujmy

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {screening: FilmShow},
    private chairService: ChairService,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAvailableChairs();
    this.userService.getLoggedInUser().subscribe(
      (next) => this.user = next
    );
  }

  getAvailableChairs() {
    this.chairService.getFreeChairsForScreening(this.data.screening).subscribe(
      (next) => this.availableChairs = next.resources
    )
  }

  placeOrder() {
    let order: Order = new Order();
    order.chairs = this.chairs;
    order.userId = this.user.id;
    order.foodProducts = this.pickedFoodCourtProducts;
    order.filmShowId = this.data.screening.id;
    console.log(order);

    this.orderService.placeOrder(order).subscribe( //To generalnie już działa, także jak się ustawi fieldy z forma to powinno być oki
      (next) => console.log(next)
    );

  }


}
