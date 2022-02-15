import {Component, Inject, OnInit} from '@angular/core';
import {Film} from "../../../../model/film";
import {Advertisement} from "../../../../model/advertisement";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AdvertisementService} from "../../../services/advertisement.service";
import {FilmService} from "../../../services/film.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {

  public addMode: boolean = true;

  films: Film[] = [];

  ads: Advertisement[] = [];

  private advertisement: Advertisement;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { ad: Advertisement },
    private advertisementService: AdvertisementService,
    private filmService: FilmService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddAdvertisementComponent>
  ) {
  }

  ngOnInit(): void {

    this.addMode = this.data.ad == null;

    this.getAds();
    this.getFilms();
    this.form = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      duration: ["", [Validators.required, Validators.pattern("[0-9]*"),
        Validators.min(1)]],
      film: ["None", [Validators.required]]
    })


    if (this.addMode) {
      this.advertisement = new Advertisement();
    } else {
      this.advertisement = this.data.ad;
      this.form.patchValue(this.advertisement);
      if (this.advertisement.film) {
        this.form.patchValue({
          film: this.advertisement.film.title
        });
      } else {
        this.form.patchValue({
          film: 'None'
        });
      }
    }
  }

  getAds(): void {
    this.advertisementService.getAll().subscribe(ads => this.ads = ads.resources);
  }

  getFilms(): void {
    this.filmService.getAll().subscribe(films => this.films = films);
  }

  save() {
    this.advertisement.companyName = this.form.value.companyName;
    this.advertisement.duration = this.form.value.duration;

    if (this.form.value.film == 'None') {

      if (this.addMode) {
        this.advertisementService.add(this.advertisement).subscribe(_ => {
          this.dialogRef.close();
        });
      } else {

        this.advertisement.getRelation<Film>('film').subscribe(f => {
            this.advertisement.deleteRelation<Film>('film', f).subscribe(_ => {
              this.advertisementService.update(this.advertisement).subscribe(_ => {
                this.dialogRef.close();
              });
            });
          },
          _ => {
            this.advertisementService.update(this.advertisement).subscribe(_ => {
              this.dialogRef.close();
            });
          });
      }
    } else {
      this.filmService.getByTitle(this.form.value.film).subscribe(f => {
        this.advertisement.film = f;

        if (this.addMode) {
          this.advertisementService.add(this.advertisement).subscribe(_ => {
            this.dialogRef.close();
          });
        } else {
          this.advertisement.bindRelation<Film>('film', this.advertisement.film)
            .subscribe(_ => {
              this.advertisementService.update(this.advertisement).subscribe(_ => {
                this.dialogRef.close();
              });
            });
        }
      });
    }
  }

}
