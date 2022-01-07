import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {Advertisement} from "../../../model/advertisement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AdvertisementService} from "../../services/advertisement.service";
import {FilmService} from "../../services/film.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";


@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {

  public addMode: boolean = true;
  private id: number;

  films: Film[] = [];

  ads: Advertisement[] = [];

  @Input()
  advertisement: Advertisement = new Advertisement();

  form: FormGroup;

  constructor(
    private advertisementService: AdvertisementService,
    private filmService: FilmService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.addMode = !this.id;

    this.getAds();
    this.getFilms();

    this.form = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      duration: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
      film: [""]
    })

    if (!this.addMode) {
      this.advertisementService.getOne(this.id).pipe(first()).subscribe(a => {
        this.advertisement = a;
        console.log(a)
        this.form.patchValue(this.advertisement)
        /*a.getRelation<Film>('film').subscribe(f => {
            this.advertisement.film = f;
            this.form.patchValue(this.advertisement);
          },
          (er) => {
            this.form.patchValue(this.advertisement);
          })*/
      });

    }
  }

  getAds(): void {
    this.advertisementService.getAll().subscribe(ads => this.ads = ads.resources);
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(films => this.films = films.resources);

  }

  save() {
    this.advertisement.companyName = this.form.value.companyName;
    this.advertisement.duration = this.form.value.duration;

    console.log(this.advertisement)
    console.log(this.form.value)

    if (this.addMode) {

      this.advertisement.film = this.form.value.film

      this.advertisementService.add(this.advertisement).subscribe((a) => {
        console.log("saved advertisement: company: " + a.companyName + " duration: " +
          a.duration);
        this.getAds();
      });
    } else {

      if (this.form.value.film) {
        console.log("filmmm")
        this.advertisement.bindRelation<Film>('film', this.form.value.film).subscribe();
      } else {
        console.log("nooo")
        this.advertisement.getRelation<Film>('film').subscribe(f => {
            this.advertisement.deleteRelation<Film>('film', f).subscribe();
          },
          e => {
            console.log("nul null")
          })
      }

      console.log(this.advertisement)

      this.advertisementService.update(this.advertisement).subscribe(a => {
        console.log("updated advertisement: company: " + a.companyName + " duration: " +
          a.duration);
        this.getAds();
      })
    }


    this.form.reset();

    this.advertisement = new Advertisement();
  }


  goBack(): void {
    this.location.back();
  }

}
