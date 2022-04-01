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
  filmImageHref: string = "";

  startDate: Date;
  endDate: Date;

  isScreeningsExpanded: boolean = false;


  constructor(private imageService: ImageService,
              private filmShowService: FilmShowService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getFilmImage(this.film.id);
    this.loadScreeningsData();

    this.route.queryParams.subscribe(
      (params) => {
        const startDateParam = params['dateFrom'];
        const endDateParam = params['dateTo'];

        this.startDate = startDateParam ? new Date(startDateParam) : new Date();

        // By default only film shows that are happening in a week after the start date should be displayed
        this.endDate = endDateParam ? new Date(endDateParam) : this.getDefaultEndDate();

        this.loadScreeningsData();
      }
    )
  }

  getDefaultEndDate(): Date {
    let endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + 7);
    return endDate;
  }

  getFilmImage(imageId: number) {
    this.imageService.getImage(imageId).subscribe(data => {
      this.filmImageHref = data.href
    })
  }

  private loadScreeningsData() {
    if (this.startDate || this.endDate) {
      this.filmShowService.getAllForFilmFilteredByDate(this.film, this.startDate, this.endDate).subscribe(
        (next) => this.screenings = next.resources
      );
    } else {
      this.filmShowService.getAllForFilm(this.film).subscribe(
        (next) => this.screenings = next.resources
      );
    }
  }

  onClickScreening(screening: FilmShow): void {
    console.log(screening);
    this.dialog.open(BuyTicketComponent, {
      data: {screening: screening},
      height: '80%',
      width: '70%'
    });
  }

}
