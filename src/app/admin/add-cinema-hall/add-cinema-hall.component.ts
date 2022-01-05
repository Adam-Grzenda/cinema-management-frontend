import {Component, Input, OnInit} from '@angular/core';
import {CinemaHallService} from "../../services/cinema-hall.service";
import {Location} from "@angular/common";
import {CinemaHall} from "../../../model/cinema-hall";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cinema} from "../../../model/cinema";
import {CinemaService} from "../../services/cinema.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";


@Component({
  selector: 'app-add-cinema-hall',
  templateUrl: './add-cinema-hall.component.html',
  styleUrls: ['./add-cinema-hall.component.css']
})
export class AddCinemaHallComponent implements OnInit {

  public addMode: boolean;
  private id: number;

  maxNumber: number = 25;

  cinemaHalls: CinemaHall[] = [];

  cinemas: Cinema[] = [];

  hallTypes: String[] = ['normal', 'premium', 'imax']

  @Input()
  cinemaHall: CinemaHall;

  form: FormGroup;

  constructor(
    private cinemaHallService: CinemaHallService,
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getHalls();
    this.getCinemas();
    this.form = this.formBuilder.group({
      number: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
      type: ["", [Validators.required]],
      cinema: ["", [Validators.required]]
    })

    if (!this.addMode) {
      this.cinemaHallService.getOne(this.id).pipe(first()).subscribe(c => this.form.patchValue(c));
    }

  }


  getHalls(): void {
    this.cinemaHallService.getAll().subscribe(halls => this.cinemaHalls = halls.resources);
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(cinemas => this.cinemas = cinemas.resources);

  }

  save() {
    this.cinemaHall = new CinemaHall();
    this.cinemaHall.number = this.form.value.number
    this.cinemaHall.type = this.form.value.type
    this.cinemaHall.cinema = this.form.value.cinema



    this.cinemaHallService.add(this.cinemaHall).subscribe((hall) => {
      hall.getRelation<Cinema>('cinema').subscribe(cinema => {
        console.log("saved cinema hall: nr: " + hall.number + " cinema: " + cinema.name);

        this.getHalls();
        this.form.reset();
        this.cinemaHall = new CinemaHall();

      })
    });


    /*this.cinemaHallService.addHall(this.cinemaHall).subscribe((hall) => {
      hall.addCollectionRelation('cinema',[this.form.value.cinema]);
      this.getHalls();

    });*/


    /*for (let name in this.form.controls) {
      this.form.controls[name].setErrors(null);

    }
    this.form.setErrors({ 'invalid': true });*/


  }

  goBack(): void {
    this.location.back();
  }

}
