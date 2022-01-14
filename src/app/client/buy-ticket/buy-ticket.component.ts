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
import {OrderProductCalculation} from "../../../model/order/orderProductCalculation";
import {OAuthService} from "angular-oauth2-oidc";
import {KeycloakUser} from "../../../model/user/keycloak-user";

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  public availableChairs: Array<Chair>; //tutaj są ładowane dostępne fotele dla danego seansu

  //Order elements
  public user: User; //Tutaj teraz jest zaciagany z user service placeholder - bede ogarnial auth po weekendzie pewnie
  public chairs: Array<Chair> = new Array<Chair>(); //TODO tutaj dodawać wybrane fotele + screening
  public pickedFoodCourtProducts: Array<FoodCourtProduct> = new Array<FoodCourtProduct>(); //TODO póki co tego nie implementujmy

  order: Order;
  orderSummary: Array<OrderProductCalculation>;

  seatForm: FormGroup
  detailsForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { screening: FilmShow },
    private chairService: ChairService,
    private userService: UserService,
    private orderService: OrderService,
    private formBuilder:FormBuilder,
    private oauthService: OAuthService
  ) {
  }

  ngOnInit(): void {
    this.getAvailableChairs();

    this.seatForm = this.formBuilder.group({
      seat: ["", Validators.required]
    })

    this.detailsForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    })

    this.getCurrentUser().then(
      (value => {
        this.user = this.getUserFromKeycloakUserInfo(value)
        this.detailsForm.setValue({ //ten form nie powinien być edytowalny teraz
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email
          })
      })
    );
  }

  getAvailableChairs() {
    this.chairService.getFreeChairsForScreening(this.data.screening).subscribe(
      (next) => this.availableChairs = next.resources
    )
  }

  createOrder() {
    this.chairs.push(this.seatForm.value.seat)

    this.order = new Order();
    this.order.chairs = this.chairs;
    this.order.userId = this.user.id;
    this.order.foodProducts = this.pickedFoodCourtProducts;
    this.order.filmShowId = this.data.screening.id;
    this.getOrderCalculation();
  }

  getOrderCalculation() {
    this.orderService.calculateOrder(this.order).subscribe(
      (next) => {
        this.orderSummary = next
        console.log(next);
        console.log(this.orderSummary)
      }
    );
  }

  placeOrder() {
    this.orderService.placeOrder(this.order).subscribe(
      (next) => console.log(next)
    );
  }

  login() {
    this.oauthService.initLoginFlowInPopup();
  }

  isUserLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  getCurrentUser(): Promise<Object> {
    return this.oauthService.loadUserProfile()
  }

  getUserFromKeycloakUserInfo(keycloakUserInfo: any): User {
    let userInfo: KeycloakUser = new KeycloakUser();
    Object.assign(userInfo, keycloakUserInfo);
    let user = new User();
    user.email = userInfo.info.email;
    user.name = userInfo.info.given_name;
    user.surname = userInfo.info.family_name;
    return user;
  }

}
