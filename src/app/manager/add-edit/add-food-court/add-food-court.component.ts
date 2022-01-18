import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CinemaService} from "../../../services/cinema.service";
import {FoodCourt} from "../../../../model/food-court";
import {FoodCourtService} from "../../../services/food-court.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-food-court',
  templateUrl: './add-food-court.component.html',
  styleUrls: ['./add-food-court.component.css']
})
export class AddFoodCourtComponent implements OnInit {


  foodCourt: FoodCourt;

  public addMode: boolean = true;

  maxNumber: number = 10;

  foodCourts: FoodCourt[] = [];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      court: FoodCourt,
      cinema_id: number
    },
    private foodCourtService: FoodCourtService,
    private cinemaService: CinemaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFoodCourtComponent>
  ) {
  }


  ngOnInit(): void {

    this.addMode = this.data.court == null;

    this.getCourts();
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      checkoutNumber: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
    })

    if (this.addMode) {
      this.foodCourt = new FoodCourt();
    } else {
      this.foodCourt = this.data.court;
      this.form.patchValue(this.foodCourt);
    }
  }

  getCourts(): void {
    this.foodCourtService.getByCinemaId(this.data.cinema_id).subscribe(courts => this.foodCourts = courts.resources);
  }

  save() {
    this.foodCourt.name = this.form.value.name;
    this.foodCourt.checkoutNumber = this.form.value.checkoutNumber;


    if (this.addMode) {
      this.cinemaService.getOne(this.data.cinema_id).subscribe(c => {
        this.foodCourt.cinema = c;
        this.foodCourtService.add(this.foodCourt).subscribe(_ => {
          this.dialogRef.close();
        });
      });
    } else {
      this.foodCourtService.update(this.foodCourt).subscribe(_ => {
        this.dialogRef.close();
      });
    }
  }

}
