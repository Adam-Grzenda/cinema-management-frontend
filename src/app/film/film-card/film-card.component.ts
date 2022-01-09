import {Component, Input, OnInit} from '@angular/core';
import {Film} from "../../../model/film";
import {ImageService} from "../../services/image.service";
import {FilmShowService} from "../../services/film-show.service";
import {FilmShow} from "../../../model/film-show";
import {MatDialog} from "@angular/material/dialog";
import {BuyTicketComponent} from "../../client/buy-ticket/buy-ticket.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css']
})
export class FilmCard implements OnInit {

  @Input()
  film: Film;

  screenings: Array<FilmShow>;
  filmImage: any;

  startDate: Date;
  endDate: Date;


  constructor(private imageService: ImageService,
              private filmShowService: FilmShowService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFilmImage(this.film.imageSource);

    this.route.queryParams.subscribe(
      (params) =>
      {
        const startDateParam = params['dateFrom'];
        this.startDate = startDateParam ? startDateParam : new Date();
        this.endDate = params['dateTo'];

        this.loadScreenings();
      }
    )
  }

  createImageURL(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.filmImage = reader.result;
    })

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getFilmImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe(data => {
      this.createImageURL(data);
    })
  }

  loadScreenings() : void {
    if (this.startDate || this.endDate) {
      this.filmShowService.getAllForFilmFilteredByDate(this.film, this.startDate, this.endDate);
    }

    this.filmShowService.getAllForFilm(this.film).subscribe(
      (next) => this.screenings = next.resources
    );
  }

  onClickScreening(screening: FilmShow): void {
    console.log(screening);
    this.dialog.open(BuyTicketComponent, {
      data: {screening: screening},
      height: '80%',
      width: '50%'
    });
  }

}
