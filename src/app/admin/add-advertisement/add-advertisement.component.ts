import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../../../model/movie";
import {Advertisement} from "../../../model/advertisement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AdvertisementService} from "../../services/advertisement.service";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {

  constructor(
    private advertisementService: AdvertisementService,
    private movieService: MovieService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  movies: Movie[] = [];

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
    this.advertisementService.getAds().subscribe(ads => this.ads = ads);
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);

  }

  save() {
    this.adv.companyName = this.form.value.company;
    this.adv.duration = this.form.value.duration;
    this.adv.movie = this.form.value.movie;

    if (this.adv.movie) {
      this.advertisementService.addAdv(this.adv).subscribe((a) => {
        console.log("saved advertisement: company: " + a.companyName + " duration: " +
          a.duration + " film: " + a.movie.title);
      });
    } else {
      this.advertisementService.addAdv(this.adv).subscribe((a) => {
        console.log("saved advertisement: company: " + a.companyName + " duration: " +
          a.duration + " film: none");
      });
    }

    this.form.reset();

    this.adv = new Advertisement();
  }


  goBack(): void {
    this.location.back();
  }

}
