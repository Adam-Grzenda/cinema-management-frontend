import {Component, Input, OnInit} from '@angular/core';
import {Cinema} from "../../../model/cinema";
import {CinemaService} from "../../services/cinema.service";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {verifySupportedTypeScriptVersion} from "@angular/compiler-cli/src/typescript_support";
import {first} from "rxjs";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  public addMode: boolean;
  private id: number;

  cinemas: Cinema[] = [];

  @Input()
  cinema: Cinema = new Cinema();

  form: FormGroup;

  constructor(
    private cinemaService: CinemaService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getCinemas()
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      address: ["", [Validators.required]]
    })

    if (!this.addMode) {
      this.cinemaService.getCinema(this.id).pipe(first()).subscribe(c => this.form.patchValue(c));
    }

  }

  save() {
    this.cinema.name = this.form.value.name;
    this.cinema.address = this.form.value.address;

    if (this.addMode) {
      this.cinemaService.addCinema(this.cinema).subscribe((a) => {
        console.log("saved:" + a.name);
        this.getCinemas();
      });
    } else {
      this.cinemaService.updateCinema(this.cinema).pipe(first()).subscribe((a) => {
        console.log("updated cinema: " + a.name);
        this.getCinemas();
      });
    }



    this.form.reset();

    this.cinema = new Cinema();
  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(cinemas => this.cinemas = cinemas.resources);

  }

  goBack(): void {
    this.location.back();
  }
}
