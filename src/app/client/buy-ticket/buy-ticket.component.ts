import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FilmShow} from "../../../model/film-show";
import {ChairService} from "../../services/chair.service";
import {Chair} from "../../../model/chair";
import {UserService} from "../../services/user.service";
import {User} from "../../../model/user/user";
import {FoodCourtProduct} from "../../../model/FoodCourtProduct";
import {Order} from "../../../model/order/order";
import {OrderService} from "../../services/order.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOffer} from "../../../model/promo-offer";
import {PromoOfferService} from "../../services/promo-offer.service";
import {OrderProductCalculation} from "../../../model/order/orderProductCalculation";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  public availableChairs: Array<Chair>; //tutaj są ładowane dostępne fotele dla danego seansu
  public availableOffers: Array<PromoOffer>;

  //Order elements
  public user: User;
  public chairs: Array<Chair> = new Array<Chair>(); //TODO tutaj dodawać wybrane fotele + screening
  public pickedFoodCourtProducts: Array<FoodCourtProduct> = new Array<FoodCourtProduct>(); //TODO póki co tego nie implementujmy

  order: Order;
  orderSummary: Array<OrderProductCalculation>;

  seatForm: FormGroup;
  detailsForm: FormGroup;
  promoForm: FormGroup;

  paymentTypes: Array<string> = ['CREDIT_CARD', 'DEBT_CARD', 'ONLINE_PAYMENT'];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { screening: FilmShow },
    private chairService: ChairService,
    public userService: UserService,
    private orderService: OrderService,
    private promoOfferService: PromoOfferService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.seatForm = this.formBuilder.group({
      seat: ["", Validators.required]
    });

    this.detailsForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      paymentType: ["", [Validators.required]]
    });

    this.promoForm = this.formBuilder.group({
      promo: ["None"]
    })

    this.userService.getCurrentUser().then(
      (value => {
        this.user = User.fromKeycloakUserInfo(value);
        this.detailsForm.patchValue({ //ten form nie powinien być edytowalny teraz
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.email
        });

        this.getOffersForClient();
      })
    );

    this.getAvailableChairs();

  }

  getAvailableChairs() {
    this.chairService.getFreeChairsForScreening(this.data.screening).subscribe(
      (next) => {
        this.availableChairs = next.resources;
        this.availableChairs.sort(compareChairs);
      })
  }

  getOffersForClient() {
    this.promoOfferService.getByUserId(this.user.id).subscribe(o => {
      this.availableOffers = o.resources;
    });
  }

  createOrder() {
    this.order = new Order();
    this.order.chairs = this.chairs;
    this.order.foodProducts = this.pickedFoodCourtProducts;
    this.order.filmShowId = this.data.screening.id;
    this.order.promoOfferId = this.promoForm.value.promo.id;
    this.order.paymentType = this.detailsForm.value.paymentType;
    this.getOrderCalculation();
  }

  getOrderCalculation() {
    this.orderService.calculateOrder(this.order).subscribe(
      (next) => {
        this.orderSummary = next
      }
    );
  }

  placeOrder() {
    this.orderService.placeOrder(this.order).subscribe(
      (next) => console.log(next)
    );
  }


  addChairs() {
    this.chairs = new Array<Chair>();
    this.chairs = this.seatForm.value.seat;
  }
}

function compareChairs(c1: Chair, c2: Chair) {
  if (c1.hallRow < c2.hallRow) {
    return -1;
  } else if (c1.hallColumn < c2.hallColumn) {
    return -1;
  } else {
    return 1;
  }
}
