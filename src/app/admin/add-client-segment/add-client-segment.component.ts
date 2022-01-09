import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientSegment} from "../../../model/client-segment";
import {Location} from "@angular/common";
import {ClientSegmentService} from "../../services/client-segment.service";
import {PromoOfferService} from "../../services/promo-offer.service";
import {PromoOffer} from "../../../model/promo-offer";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-add-client-segment',
  templateUrl: './add-client-segment.component.html',
  styleUrls: ['./add-client-segment.component.css']
})
export class AddClientSegmentComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;

  segments: ClientSegment[] = [];

  offers: PromoOffer[] = [];

  @Input()
  segment: ClientSegment = new ClientSegment();

  form: FormGroup;

  constructor(
    private clientSegmentService: ClientSegmentService,
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getSegments();
    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      promoOffer: [""]
    })

    if (!this.addMode) {
      this.clientSegmentService.getOne(this.id).pipe(first()).subscribe(s => {
        this.segment = s;
        this.form.patchValue(this.segment);
      });
    }
  }


  getSegments(): void {
    this.clientSegmentService.getAll().subscribe(segments => this.segments = segments.resources);
  }

  getOffers(): void {
    this.promoOfferService.getAll().subscribe(offers => this.offers = offers.resources);

  }

  save() {
    this.segment.name = this.form.value.name;
    this.segment.promoOffer = this.form.value.promoOffer;

    if (this.addMode) {
      this.clientSegmentService.add(this.segment).subscribe(s => {
        console.log("saved segment: name: " + s.name);
        this.getSegments();

        this.form.reset();

        this.segment = new ClientSegment();

      });
    } else {

      if (this.form.value.promoOffer) {

        this.segment.bindRelation<PromoOffer>('promoOffer', this.form.value.promoOffer).subscribe(_ => {

          this.clientSegmentService.update(this.segment).subscribe(s => {
            console.log("updated segment: name: " + s.name);
            this.getSegments();

            this.form.reset();

            this.segment = new ClientSegment();

          });

        });
      } else {

        this.segment.getRelation<PromoOffer>('promoOffer').subscribe(o => {
            this.segment.deleteRelation<PromoOffer>('promoOffer', o).subscribe(_ => {
              this.clientSegmentService.update(this.segment).subscribe(s => {
                console.log("updated segment: name: " + s.name);
                this.getSegments();

                this.form.reset();

                this.segment = new ClientSegment();

              });
            });
          },
          (er) => {
            console.log("null null")
            this.clientSegmentService.update(this.segment).subscribe(s => {
              console.log("updated segment: name: " + s.name);
              this.getSegments();

              this.form.reset();

              this.segment = new ClientSegment();

            });
          })
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
