import {Component, Input, OnInit} from '@angular/core';
import {CinemaHallService} from "../../services/cinema-hall.service";
import {Location} from "@angular/common";
import {CinemaHall} from "../../../model/cinema-hall";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cinema} from "../../../model/cinema";
import {CinemaService} from "../../services/cinema.service";


@Component({
  selector: 'app-add-cinema-hall',
  templateUrl: './add-cinema-hall.component.html',
  styleUrls: ['./add-cinema-hall.component.css']
})
export class AddCinemaHallComponent implements OnInit {

  maxNumber: number = 25;

  cinemaHalls: CinemaHall[] = [];

  cinemas: Cinema[] = [];

  hallTypes: String[] = ['normal','premium', 'imax']

  @Input()
  cinemaHall: CinemaHall = new CinemaHall();

  form: FormGroup;

  constructor(
    private cinemaHallService: CinemaHallService,
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.getHalls();
    this.getCinemas();
    this.form = this.formBuilder.group({
      number: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
      type: ["", [Validators.required]],
      cinema: ["", [Validators.required]]
    })
  }


  getHalls(): void {
    this.cinemaHallService.getHalls().subscribe(halls => this.cinemaHalls = halls);
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(cinemas => this.cinemas = cinemas);

  }

  save() {
    this.cinemaHall.number = this.form.value.number
    this.cinemaHall.type = this.form.value.type
    this.cinemaHall.cinema = this.form.value.cinema

    this.cinemaHallService.addHall(this.cinemaHall).subscribe((a) => {
      console.log("saved: hall: " + a.number +" type: " + a.type + " cinema: " + a.cinema.name);
    });

    this.form.reset();

    /*for (let name in this.form.controls) {
      this.form.controls[name].setErrors(null);

    }
    this.form.setErrors({ 'invalid': true });*/

    this.cinemaHall = new CinemaHall();
  }

  goBack(): void {
    this.location.back();
  }

}
