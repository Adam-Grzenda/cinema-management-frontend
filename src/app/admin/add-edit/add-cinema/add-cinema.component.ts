import {Component, Inject, OnInit} from '@angular/core';
import {Cinema} from "../../../../model/cinema";
import {CinemaService} from "../../../services/cinema.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  public addMode: boolean = true;

  cinemas: Cinema[] = [];

  private cinema: Cinema;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { cinema: Cinema },
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCinemaComponent>,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.cinema == null;

    this.getCinemas()
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      address: ["", [Validators.required]]
    })

    if (this.addMode) {
      this.cinema = new Cinema();
    } else {
      this.cinema = this.data.cinema;
      this.form.patchValue(this.cinema);
    }
  }

  save() {
    this.cinema.name = this.form.value.name;
    this.cinema.address = this.form.value.address;

    if (this.addMode) {
      this.cinemaService.add(this.cinema).subscribe(_ => {
        this.dialogRef.close();
      },
        _ => {
          this.snackBar.open("Error! This cinema violates unique constraint and could not be added.", "close", {
            duration: 5000
          });
        });
    } else {
      this.cinemaService.update(this.cinema).subscribe(_ => {
        this.dialogRef.close();
      },
        _ => {
          this.snackBar.open("Error! This cinema violates unique constraint and could not be updated.", "close", {
            duration: 5000
          });
        });
    }
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(cinemas => this.cinemas = cinemas.resources);
  }

}
