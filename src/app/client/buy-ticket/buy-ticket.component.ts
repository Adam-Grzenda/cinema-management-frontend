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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOffer} from "../../../model/promo-offer";
import {PromoOfferService} from "../../services/promo-offer.service";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  public availableChairs: Array<Chair>; //tutaj są ładowane dostępne fotele dla danego seansu
  public availableOffers: Array<PromoOffer>;

  //Order elements
  public user: User; //Tutaj teraz jest zaciagany z user service placeholder - bede ogarnial auth po weekendzie pewnie
  public chairs: Array<Chair> = new Array<Chair>(); //TODO tutaj dodawać wybrane fotele + screening
  public pickedFoodCourtProducts: Array<FoodCourtProduct> = new Array<FoodCourtProduct>(); //TODO póki co tego nie implementujmy

  seatForm: FormGroup;
  detailsForm: FormGroup;
  promoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { screening: FilmShow },
    private chairService: ChairService,
    private userService: UserService,
    private orderService: OrderService,
    private promoOfferService:PromoOfferService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAvailableChairs();
    this.userService.getLoggedInUser().subscribe(
      (next) => this.user = next
    );
    this.seatForm = this.formBuilder.group({
      seat: ["", Validators.required]
    });

    this.detailsForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });

    this.promoForm = this.formBuilder.group({
      promo: [""]
    })

    if (this.user) {
      this.detailsForm.setValue({
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email
      })
    }

  }

  getAvailableChairs() {
    this.chairService.getFreeChairsForScreening(this.data.screening).subscribe(
      (next) => this.availableChairs = next.resources
    );
  }

  getOffersForClient() {
    this.promoOfferService.getByUserId(this.user.id).subscribe(o => {
      this.availableOffers = o.resources;
    });
  }

  placeOrder() {
    let order: Order = new Order();
    this.chairs.push(this.seatForm.value)
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
