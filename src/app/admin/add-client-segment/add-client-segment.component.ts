import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientSegment} from "../../../model/client-segment";
import {Location} from "@angular/common";
import {ClientSegmentService} from "../../services/client-segment.service";
import {PromoOfferService} from "../../services/promo-offer.service";
import {PromoOffer} from "../../../model/promo-offer";

@Component({
  selector: 'app-add-client-segment',
  templateUrl: './add-client-segment.component.html',
  styleUrls: ['./add-client-segment.component.css']
})
export class AddClientSegmentComponent implements OnInit {

  segments: ClientSegment[] = [];

  offers: PromoOffer[] = [];

  @Input()
  segment: ClientSegment = new ClientSegment();

  form: FormGroup;

  constructor(
    private clientSegmentService: ClientSegmentService,
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getSegments();
    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      offer: [""]
    })
  }


  getSegments(): void {
    this.clientSegmentService.getAll().subscribe(segments => this.segments = segments.resources);
  }

  getOffers(): void {
    this.promoOfferService.getAll().subscribe(offers => this.offers = offers.resources);

  }

  save() {
    this.segment.name = this.form.value.name
    this.segment.promoOffer = this.form.value.offer

    if (this.segment.promoOffer) {
      this.clientSegmentService.add(this.segment).subscribe((a) => {
        console.log("saved segment: name: " + a.name + " promo offer name: " +
          a.promoOffer.name);
      });
    } else {
      this.clientSegmentService.add(this.segment).subscribe((a) => {
        console.log("saved segment: name: " + a.name + " promo offer name: none");
      });

    }

    this.form.reset();

    this.segment = new ClientSegment();
  }


  goBack(): void {
    this.location.back();
  }

}
