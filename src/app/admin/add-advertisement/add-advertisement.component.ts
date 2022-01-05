import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {Advertisement} from "../../../model/advertisement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AdvertisementService} from "../../services/advertisement.service";
import {FilmService} from "../../services/film.service";


@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {

  constructor(
    private advertisementService: AdvertisementService,
    private filmService: FilmService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  films: Film[] = [];

  ads: Advertisement[] = [];

  @Input()
  adv: Advertisement = new Advertisement();

  form: FormGroup;

  ngOnInit(): void {
    this.getAds();
    this.getMovies();
    this.form = this.formBuilder.group({
      company: ["", [Validators.required]],
      duration: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
      movie: [""]
    })
  }

  getAds(): void {
    this.advertisementService.getAll().subscribe(ads => this.ads = ads.resources);
  }

  getMovies(): void {
    this.filmService.getFilms().subscribe(films => this.films = films.resources);

  }

  save() {
    this.adv.companyName = this.form.value.company;
    this.adv.duration = this.form.value.duration;
    this.adv.film = this.form.value.movie;

    if (this.adv.film) {
      this.advertisementService.add(this.adv).subscribe((a) => {
        a.getRelation<Film>('film').subscribe(film => {
          console.log("saved advertisement: company: " + a.companyName + " duration: " +
            a.duration + " film: " + film.title);
          this.getAds();
        })

      });
    } else {
      this.advertisementService.add(this.adv).subscribe((a) => {
        console.log("saved advertisement: company: " + a.companyName + " duration: " +
          a.duration + " film: none");
        this.getAds();
      });
    }

    this.form.reset();

    this.adv = new Advertisement();
  }


  goBack(): void {
    this.location.back();
  }

}
