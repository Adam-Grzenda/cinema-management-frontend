import {Component, Input, OnInit} from '@angular/core';
import {PromoOffer} from "../../../../model/promo-offer";
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {CinemaService} from "../../../services/cinema.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOfferService} from "../../../services/promo-offer.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-add-promo-offer',
  templateUrl: './add-promo-offer.component.html',
  styleUrls: ['./add-promo-offer.component.css']
})
export class AddPromoOfferComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;

  public maxNumber: number = 75;

  offers: PromoOffer[] = [];

  @Input()
  offer: PromoOffer = new PromoOffer();

  form: FormGroup;

  constructor(
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      discount: ["", [Validators.required,
        Validators.min(1), Validators.max(this.maxNumber)]],
    })

    if(!this.addMode) {
      this.promoOfferService.getOne(this.id).pipe(first()).subscribe(o => {
        this.offer = o;
        this.form.patchValue(this.offer);
        console.log(this.offer)
      })
    }
  }

  getOffers(): void {
    this.promoOfferService.getAll().subscribe(offers => this.offers = offers.resources);
  }

  save() {
    this.offer.name = this.form.value.name
    this.offer.discount = this.form.value.discount

    if (this.addMode) {
      this.promoOfferService.add(this.offer).subscribe((a) => {
        console.log("saved: offer: " + a.name +" discount: " +a.discount);
        this.getOffers();
      });
    } else {
      this.promoOfferService.update(this.offer).subscribe((a) => {
        console.log("saved: offer: " + a.name +" discount: " +a.discount);
        this.getOffers();
      });
    }



    this.form.reset();

    this.offer = new PromoOffer();
  }



  goBack(): void {
    this.location.back();
  }

}
