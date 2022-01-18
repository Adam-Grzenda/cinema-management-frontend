import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../../model/product-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ProductTypeService} from "../../../services/product-type.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CinemaHall} from "../../../../model/cinema-hall";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  public addMode: boolean = true;

  types: ProductType[] = [];

  private productType: ProductType;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { type: ProductType },
    private productTypeService: ProductTypeService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProductTypeComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.type == null;

    this.getTypes();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      unit: ["", [Validators.required, Validators.pattern("[a-zA-Z]{1,5}")]],
      amount: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
    })

    if (this.addMode) {
      this.productType = new ProductType();
    } else {
      this.productType = this.data.type;
      this.form.patchValue(this.productType);
    }
  }

  getTypes(): void {
    this.productTypeService.getAll().subscribe(types => this.types = types.resources);
  }


  save() {
    this.productType.name = this.form.value.name;
    this.productType.unit = this.form.value.unit;
    this.productType.amount = this.form.value.amount;

    if (this.addMode) {
      this.productTypeService.add(this.productType).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This product type violates unique constraint and could not be added.", "close", {
            duration: 5000
          });
        });
    } else {
      this.productTypeService.update(this.productType).subscribe(_ => {
          this.dialogRef.close();
        },
        _ => {
          this.snackBar.open("Error! This product type violates unique constraint and could not be updated.", "close", {
            duration: 5000
          });
        });
    }


    this.productType = new ProductType();
  }


  goBack(): void {
    this.location.back();
  }

}
