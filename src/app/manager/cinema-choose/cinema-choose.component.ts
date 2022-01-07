import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CinemaService} from "../../services/cinema.service";
import {Cinema} from "../../../model/cinema";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cinema-choose',
  templateUrl: './cinema-choose.component.html',
  styleUrls: ['./cinema-choose.component.css']
})
export class CinemaChooseComponent implements OnInit {


  form: FormGroup;
  cinemas: Cinema[] = [];

  cinema:Cinema;

  constructor(
    private formBuilder: FormBuilder,
    private cinemaService: CinemaService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getCinemas();

    this.form = this.formBuilder.group({
      cinema: ['', Validators.required]
    })
  }

  save(): void {
    this.cinema = this.form.value.cinema;

    let nav = this.router.navigate(["manager","main", this.cinema.id])

  }

  getCinemas(): void {
    this.cinemaService.getAll().subscribe(c => this.cinemas = c.resources)
  }

}
