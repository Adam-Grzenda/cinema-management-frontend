import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../model/product-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PromoOfferService} from "../../services/promo-offer.service";
import {Location} from "@angular/common";
import {ProductTypeService} from "../../services/product-type.service";

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  types: ProductType[] = [];

  @Input()
  productType: ProductType = new ProductType();

  form: FormGroup;

  constructor(
    private productTypeService: ProductTypeService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTypes();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      unit: ["", [Validators.required,Validators.pattern("[a-zA-Z]{1,5}")]],
      amount: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
    })
  }

  getTypes(): void {
    this.productTypeService.getTypes().subscribe(types => this.types = types);
  }


  save() {
    this.productType.name = this.form.value.name;
    this.productType.unit = this.form.value.unit;
    this.productType.amount = this.form.value.amount;

    this.productTypeService.addType(this.productType).subscribe((a) => {
      console.log("saved type: name: " + a.name + " unit: " +
        a.unit + " amount: " + a.amount);
    });

    this.productType = new ProductType();
  }


  goBack(): void {
    this.location.back();
  }

}
