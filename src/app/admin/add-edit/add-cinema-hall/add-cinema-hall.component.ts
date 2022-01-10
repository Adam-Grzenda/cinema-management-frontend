import {Component, Inject, Input, OnInit} from '@angular/core';
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {Location} from "@angular/common";
import {CinemaHall} from "../../../../model/cinema-hall";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cinema} from "../../../../model/cinema";
import {CinemaService} from "../../../services/cinema.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-add-cinema-hall',
  templateUrl: './add-cinema-hall.component.html',
  styleUrls: ['./add-cinema-hall.component.css']
})
export class AddCinemaHallComponent implements OnInit {

  public addMode: boolean = true;

  maxNumber: number = 25;

  cinemas: Cinema[] = [];

  cinemaHalls: CinemaHall[] = [];

  private cinemaHall: CinemaHall;

  hallTypes: String[] = ['normal', 'premium', 'imax']

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { hall: CinemaHall },
    private cinemaHallService: CinemaHallService,
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    this.addMode = this.data.hall == null;

    this.getHalls();
    this.getCinemas();
    this.form = this.formBuilder.group({
      number: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1), Validators.max(this.maxNumber)]],
      type: ["", [Validators.required]],
      cinema: ["", [Validators.required]]
    })

    if (this.addMode) {
      this.cinemaHall = new CinemaHall();
    } else {
      this.cinemaHall = this.data.hall;
      this.form.patchValue(this.cinemaHall);
      this.form.patchValue({
        cinema: this.cinemaHall.cinema.name
      })
      console.log(this.cinemaHall)
    }

    /*if (!this.addMode) {
      this.cinemaHallService.getOne(this.data.hall.id).pipe(first()).subscribe(h => {
        this.cinemaHall = h;
        h.getRelation<Cinema>('cinema').subscribe(c => {
          this.cinemaHall.cinema = c;
          this.form.patchValue(this.cinemaHall);
        })
      });

    }*/

  }


  getHalls(): void {
    this.cinemaHallService.getAll().subscribe(h => this.cinemaHalls = h.resources);
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(c => this.cinemas = c.resources);

  }


  save() {
    this.cinemaHall.number = this.form.value.number
    this.cinemaHall.type = this.form.value.type
    this.cinemaHall.cinema = this.form.value.cinema
    console.log(this.form.value.cinema)
    //#TODO save subscribe cinemahall.cinema based on the name + adjust save and update


    if (this.addMode) {
      this.cinemaHallService.add(this.cinemaHall).subscribe((a) => {
        console.log("saved: hall: " + a.number + " type: " + a.type);
        this.getHalls();

        this.form.reset();

        this.cinemaHall = new CinemaHall();
      });
    } else {
      this.cinemaHall.bindRelation<Cinema>('cinema', this.cinemaHall.cinema).subscribe(_ => {
        this.cinemaHallService.update(this.cinemaHall).subscribe((a) => {
          console.log("updated: hall: " + a.number + " type: " + a.type);
          this.getHalls();

          this.form.reset();

          this.cinemaHall = new CinemaHall();
        });
      })


    }

  }

  goBack(): void {
    this.location.back();
  }

}
