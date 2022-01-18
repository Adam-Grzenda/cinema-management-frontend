import {Component, Inject, OnInit} from '@angular/core';
import {PromoOffer} from "../../../../model/promo-offer";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOfferService} from "../../../services/promo-offer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-promo-offer',
  templateUrl: './add-promo-offer.component.html',
  styleUrls: ['./add-promo-offer.component.css']
})
export class AddPromoOfferComponent implements OnInit {

  public addMode: boolean = true;

  public maxNumber: number = 75;

  offers: PromoOffer[] = [];

  private offer: PromoOffer;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { offer: PromoOffer },
    private promoOfferService: PromoOfferService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPromoOfferComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.offer == null;

    this.getOffers();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      discount: ["", [Validators.required,
        Validators.min(1), Validators.max(this.maxNumber)]],
    })

    if (this.addMode) {
      this.offer = new PromoOffer();
    } else {
      this.offer = this.data.offer;
      this.form.patchValue(this.offer);
    }
  }

  getOffers(): void {
    this.promoOfferService.getAll().subscribe(offers => this.offers = offers.resources);
  }

  save() {
    this.offer.name = this.form.value.name
    this.offer.discount = this.form.value.discount

    if (this.addMode) {
      this.promoOfferService.add(this.offer).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This offer violates unique constraint and could not be added.", "close", {
            duration: 5000
          });
        });
    } else {
      this.promoOfferService.update(this.offer).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This offer violates unique constraint and could not be updated.", "close", {
            duration: 5000
          });
        });
    }
  }

}
