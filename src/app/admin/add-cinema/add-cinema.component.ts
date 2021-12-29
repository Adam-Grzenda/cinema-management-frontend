import {Component, Input, OnInit} from '@angular/core';
import {Cinema} from "../../../model/cinema";
import {CinemaService} from "../../services/cinema.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  cinemas: Cinema[] = [];

  @Input()
  cinema: Cinema = new Cinema();

  form: FormGroup;

  constructor(
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getCinemas()
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      address: ["", [Validators.required]]
    })
  }

  save() {
    this.cinema.name = this.form.value.name;
    this.cinema.address = this.form.value.address;
    this.cinemaService.addCinema(this.cinema).subscribe((a) => {
      console.log("saved:" + a.name);

    });


    this.cinema = new Cinema();
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(cinemas => this.cinemas = cinemas);

  }

  goBack(): void {
    this.location.back();
  }
}
