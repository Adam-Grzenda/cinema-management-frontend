import {Component, Input, OnInit} from '@angular/core';
import {FoodCourt} from "../../../model/food-court";

@Component({
  selector: 'app-food-court-product-type',
  templateUrl: './food-court-product-type.component.html',
  styleUrls: ['./food-court-product-type.component.css']
})
export class FoodCourtProductTypeComponent implements OnInit {

  @Input()
  foodCourt:FoodCourt;

  constructor() { }

  ngOnInit(): void {
  }

}
