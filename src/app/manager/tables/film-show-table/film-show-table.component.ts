import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FilmShow} from "../../../../model/film-show";
import {MatTableDataSource} from "@angular/material/table";
import {CinemaHall} from "../../../../model/cinema-hall";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FilmShowService} from "../../../services/film-show.service";
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {FilmService} from "../../../services/film.service";
import {MatDialog} from "@angular/material/dialog";
import {Film} from "../../../../model/film";
import {AddCinemaHallComponent} from "../../../admin/add-edit/add-cinema-hall/add-cinema-hall.component";
import {AddFilmShowComponent} from "../../add-edit/add-film-show/add-film-show.component";
import {getSortingDataAccessor} from "../../../tools";


@Component({
  selector: 'app-film-show-table',
  templateUrl: './film-show-table.component.html',
  styleUrls: ['./film-show-table.component.css']
})
export class FilmShowTableComponent implements OnInit {

  @Input()
  cinemaId: number;

  private filmShows: Array<FilmShow>;

  dataSource: MatTableDataSource<FilmShow>;
  displayedColumns: string[] =
    ['id', 'date', 'type', 'cinemaHall.number', 'film.title', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private filmShowService: FilmShowService,
    private cinemaHallService: CinemaHallService,
    private filmService: FilmService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getShows();
  }

  private getShows() {
    this.filmShowService.getAllByCinemaId(this.cinemaId).subscribe(s => {
      this.filmShows = s.resources;
      for (let show of this.filmShows) {
        show.getRelation<CinemaHall>('cinemaHall').subscribe(h => {
          show.cinemaHall = h;
        });
        show.getRelation<Film>('film').subscribe(f => {
          show.film = f;
        });
      }

      this.dataSource = new MatTableDataSource<FilmShow>(this.filmShows);
      this.dataSource.sortingDataAccessor = getSortingDataAccessor();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(show: FilmShow) {
    this.filmShowService.delete(show).subscribe(s => {
      this.getShows();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(show: FilmShow): void {
    const dialogRef = this.dialog.open(AddFilmShowComponent, {
      data: {show: show, cinema_id: this.cinemaId},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getShows();
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddFilmShowComponent, {
      data: {show: null, cinema_id: this.cinemaId},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getShows();
    });
  }

}
