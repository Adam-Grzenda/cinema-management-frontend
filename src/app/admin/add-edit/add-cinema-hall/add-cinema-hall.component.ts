import {Component, Inject, OnInit} from '@angular/core';
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {Location} from "@angular/common";
import {CinemaHall} from "../../../../model/cinema-hall";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cinema} from "../../../../model/cinema";
import {CinemaService} from "../../../services/cinema.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


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
    private dialogRef: MatDialogRef<AddCinemaHallComponent>
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
    }
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
    this.cinemaService.getByName(this.form.value.cinema).subscribe(c => {
      this.cinemaHall.cinema = c;

      if (this.addMode) {
        this.cinemaHallService.add(this.cinemaHall).subscribe(_ => {
          this.dialogRef.close();
        });
      } else {
        this.cinemaHall.bindRelation<Cinema>('cinema', this.cinemaHall.cinema)
          .subscribe(_ => {
          this.cinemaHallService.update(this.cinemaHall).subscribe(_ => {
            this.dialogRef.close();
          });
        })
      }
    })
  }
}
