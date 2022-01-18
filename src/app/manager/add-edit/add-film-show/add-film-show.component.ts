import {Component, Inject, OnInit} from '@angular/core';
import {Film} from "../../../../model/film";
import {CinemaHall} from "../../../../model/cinema-hall";
import {FilmShowService} from "../../../services/film-show.service";
import {FilmService} from "../../../services/film.service";
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilmShow} from "../../../../model/film-show";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-film-show',
  templateUrl: './add-film-show.component.html',
  styleUrls: ['./add-film-show.component.css']
})
export class AddFilmShowComponent implements OnInit {

  public addMode: boolean = true;

  films: Film[] = [];
  halls: CinemaHall[] = [];

  private screening: FilmShow;

  showTypes: string[] = ['TWO_DIM', 'THREE_DIM', 'FIVE_DIM', 'IMAX'];

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      show: FilmShow,
      cinema_id: number
    },
    private filmShowService: FilmShowService,
    private filmService: FilmService,
    private cinemaHallService: CinemaHallService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddFilmShowComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.addMode = this.data.show == null;

    this.getFilms();
    this.getHalls();
    this.form = this.formBuilder.group({
      date: ["", Validators.required],
      type: ["", Validators.required],
      hall: ["", Validators.required],
      film: ["", Validators.required],
    });

    if (this.addMode) {
      this.screening = new FilmShow();
    } else {
      this.screening = this.data.show;
      this.form.patchValue(this.screening);
      this.form.patchValue({
        film: this.screening.film.title,
        hall: this.screening.cinemaHall.number.toString(),
      });
    }
  }

  private getFilms() {
    this.filmService.getAll().subscribe(f => {
      this.films = f.resources;
    });
  }

  private getHalls() {
    this.cinemaHallService.getAllByCinemaId(this.data.cinema_id).subscribe(h => {
      this.halls = h.resources;
    });
  }

  save() {
    this.screening.date = this.form.value.date;
    this.screening.type = this.form.value.type;
    // @ts-ignore
    this.screening.cinemaHall = this.halls.find(h => h.number == this.form.value.hall);
    // @ts-ignore
    this.screening.film = this.films.find(f => f.title == this.form.value.film);

    if (this.addMode) {
      this.filmShowService.add(this.screening).subscribe(_ => {
        this.dialogRef.close();
      },
        _ => {
          this.snackBar.open("Error! This film show violates unique constraint and could not be added.", "close", {
            duration: 5000
          });
        });
    } else {
      this.filmShowService.update(this.screening).subscribe(_ => {
        this.screening.bindRelation<CinemaHall>('cinemaHall', this.screening.cinemaHall)
          .subscribe(_ => {
            this.screening.bindRelation<Film>('film', this.screening.film)
              .subscribe(_ => {
                this.dialogRef.close();
              });
          });
      },
        _ => {
          this.snackBar.open("Error! This film show violates unique constraint and could not be updated.", "close", {
            duration: 5000
          });
        });
    }
  }

}
