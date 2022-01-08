import {Component, Input, OnInit} from '@angular/core';
import {CinemaHall} from "../../../model/cinema-hall";
import {Cinema} from "../../../model/cinema";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CinemaHallService} from "../../services/cinema-hall.service";
import {CinemaService} from "../../services/cinema.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {FoodCourt} from "../../../model/food-court";
import {FoodCourtService} from "../../services/food-court.service";

@Component({
  selector: 'app-add-food-court',
  templateUrl: './add-food-court.component.html',
  styleUrls: ['./add-food-court.component.css']
})
export class AddFoodCourtComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;
  private cinema_id: number;

  maxNumber: number = 10;

  foodCourts: FoodCourt[] = [];

  cinemas: Cinema[] = [];

  @Input()
  foodCourt: FoodCourt = new FoodCourt();

  form: FormGroup;

  constructor(
    private foodCourtService: FoodCourtService,
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    this.cinema_id = this.route.snapshot.params['cinema_id']
    console.log(this.cinema_id)
    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getCourts();
    this.getCinemas();

    this.form = this.formBuilder.group({
      checkoutNumber: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
    })

    if (!this.addMode) {
      this.foodCourtService.getOne(this.id).pipe(first()).subscribe(c => {
        this.foodCourt = c;
        c.getRelation<Cinema>('cinema').subscribe(c => {
          this.foodCourt.cinema = c;
          this.form.patchValue(this.foodCourt);
        })
      });

    }

  }


  getCourts(): void {
    this.foodCourtService.getAll().subscribe(courts => this.foodCourts = courts.resources);
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(cinemas => this.cinemas = cinemas.resources);

  }

  save() {
    this.foodCourt.checkoutNumber = this.form.value.checkoutNumber

    console.log(this.foodCourt)

    if (this.addMode) {
      this.cinemaService.getOne(this.cinema_id).subscribe(c => {

        this.foodCourt.cinema = c;
        console.log(this.foodCourt)

        this.foodCourtService.add(this.foodCourt).subscribe((f) => {
          console.log("saved: foodcourt: " + f.id + "ch. num: " + f.checkoutNumber);
          this.getCourts();

          this.form.reset();

          this.foodCourt = new FoodCourt();

        });
      })
    } else {
      this.foodCourtService.update(this.foodCourt).subscribe((f) => {
        console.log("updated: foodcourt: " + f.id + "ch. num: " + f.checkoutNumber);
        this.getCourts();
      });

    }


  }

  goBack(): void {
    this.location.back();
  }

}
