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

  public addMode: boolean = true;
  private id: number;

  maxNumber: number = 25;

  cinemaHalls: CinemaHall[] = [];

  cinemas: Cinema[] = [];

  hallTypes: String[] = ['normal', 'premium', 'imax']

  @Input()
  cinemaHall: CinemaHall = new CinemaHall();

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
      this.cinemaHallService.getOne(this.id).pipe(first()).subscribe(h => {
        this.cinemaHall = h;
        h.getRelation<Cinema>('cinema').subscribe(c => {
          this.cinemaHall.cinema = c;
          this.form.patchValue(this.cinemaHall);
          this.form.patchValue({
            cinema: this.cinemaHall.cinema
          })
        })
      });

    }

  }


  getHalls(): void {
    this.cinemaHallService.getAll().subscribe(halls => this.cinemaHalls = halls.resources);
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(cinemas => this.cinemas = cinemas.resources);

  }

  save() {
    this.cinemaHall.number = this.form.value.number
    this.cinemaHall.type = this.form.value.type
    this.cinemaHall.cinema = this.form.value.cinema



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
