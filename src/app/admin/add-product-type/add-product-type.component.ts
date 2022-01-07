import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../model/product-type";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ProductTypeService} from "../../services/product-type.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;

  types: ProductType[] = [];

  @Input()
  productType: ProductType = new ProductType();

  form: FormGroup;

  constructor(
    private productTypeService: ProductTypeService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getTypes();
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      unit: ["", [Validators.required,Validators.pattern("[a-zA-Z]{1,5}")]],
      amount: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
    })

    if (!this.addMode) {
      this.productTypeService.getOne(this.id).pipe(first()).subscribe(t => {
        this.productType = t;
        this.form.patchValue(this.productType);
      })
    }

  }

  getTypes(): void {
    this.productTypeService.getAll().subscribe(types => this.types = types.resources);
  }


  save() {
    this.productType.name = this.form.value.name;
    this.productType.unit = this.form.value.unit;
    this.productType.amount = this.form.value.amount;
    console.log(this.productType)

    if (this.addMode) {
      this.productTypeService.add(this.productType).subscribe((a) => {
        console.log("saved type: name: " + a.name + " unit: " +
          a.unit + " amount: " + a.amount);
        this.getTypes();
      });
    } else {
      this.productTypeService.update(this.productType).subscribe((a) => {
        console.log("updated type: name: " + a.name + " unit: " +
          a.unit + " amount: " + a.amount);
        this.getTypes();
      });
    }



    this.productType = new ProductType();
  }


  goBack(): void {
    this.location.back();
  }

}
