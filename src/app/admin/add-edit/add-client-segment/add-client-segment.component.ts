import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientSegment} from "../../../../model/client-segment";
import {Location} from "@angular/common";
import {ClientSegmentService} from "../../../services/client-segment.service";
import {PromoOfferService} from "../../../services/promo-offer.service";
import {PromoOffer} from "../../../../model/promo-offer";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Advertisement} from "../../../../model/advertisement";

@Component({
  selector: 'app-add-client-segment',
  templateUrl: './add-client-segment.component.html',
  styleUrls: ['./add-client-segment.component.css']
})
export class AddClientSegmentComponent implements OnInit {

  public addMode: boolean = true;

  segments: ClientSegment[] = [];

  offers: PromoOffer[] = [];

  private segment: ClientSegment;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { segment: ClientSegment },
    private clientSegmentService: ClientSegmentService,
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddClientSegmentComponent>
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.segment == null;

    this.getSegments();
    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      promoOffer: ["None"]
    })

    if (this.addMode) {
      this.segment = new ClientSegment();
    } else {
      this.segment = this.data.segment;
      this.form.patchValue(this.segment);
      if (this.segment.promoOffer) {
        this.form.patchValue({
          promoOffer: this.segment.promoOffer.name
        });
      } else {
        this.form.patchValue({
          promoOffer: 'None'
        });
      }
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

    if (this.form.value.promoOffer == 'None') {

      if (this.addMode) {
        this.clientSegmentService.add(this.segment).subscribe(_ => {
          this.dialogRef.close();
        });
      } else {

        this.segment.getRelation<PromoOffer>('promoOffer').subscribe(o => {
            this.segment.deleteRelation<PromoOffer>('promoOffer', o).subscribe(_ => {
              this.clientSegmentService.update(this.segment).subscribe(_ => {
                this.dialogRef.close();
              });
            });
          },
          _ => {
            this.clientSegmentService.update(this.segment).subscribe(_ => {
              this.dialogRef.close();
            });
          });
      }
    } else {
      this.promoOfferService.getByName(this.form.value.promoOffer).subscribe(o => {
        this.segment.promoOffer = o;

        if (this.addMode) {
          this.clientSegmentService.add(this.segment).subscribe(_ => {
            this.dialogRef.close();
          });
        } else {
          this.segment.bindRelation<PromoOffer>('promoOffer', this.segment.promoOffer)
            .subscribe(_ => {
              this.clientSegmentService.update(this.segment).subscribe(_ => {
                this.dialogRef.close();
              });
            });
        }
      });
    }
  }

}
