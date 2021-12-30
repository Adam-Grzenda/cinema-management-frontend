import {Component, Input, OnInit} from '@angular/core';
import {PromoOffer} from "../../../model/promo-offer";
import {CinemaHallService} from "../../services/cinema-hall.service";
import {CinemaService} from "../../services/cinema.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOfferService} from "../../services/promo-offer.service";

@Component({
  selector: 'app-add-promo-offer',
  templateUrl: './add-promo-offer.component.html',
  styleUrls: ['./add-promo-offer.component.css']
})
export class AddPromoOfferComponent implements OnInit {

  public maxNumber: number = 75;

  offers: PromoOffer[] = [];

  @Input()
  offer: PromoOffer = new PromoOffer();

  form: FormGroup;

  constructor(
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      discount: ["", [Validators.required,
        Validators.min(1), Validators.max(this.maxNumber)]],
    })
  }

  getOffers(): void {
    this.promoOfferService.getOffers().subscribe(offers => this.offers = offers);
  }

  save() {
    this.offer.name = this.form.value.name
    this.offer.discount = this.form.value.discount

    this.promoOfferService.addOffer(this.offer).subscribe((a) => {
      console.log("saved: offer: " + a.name +" discount: " +a.discount);
    });

    this.form.reset();

    this.offer = new PromoOffer();
  }



  goBack(): void {
    this.location.back();
  }

}
