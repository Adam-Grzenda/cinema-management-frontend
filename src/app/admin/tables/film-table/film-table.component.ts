import {Component, OnInit, ViewChild} from '@angular/core';
import {Film} from "../../../../model/film";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FilmService} from "../../../services/film.service";
import {MatDialog} from "@angular/material/dialog";
import {getSortingDataAccessor} from "../../../tools";
import {AddFilmComponent} from "../../add-edit/add-film/add-film.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-film-table',
  templateUrl: './film-table.component.html',
  styleUrls: ['./film-table.component.css']
})
export class FilmTableComponent implements OnInit {

  private films: Array<Film>;

  dataSource: MatTableDataSource<Film>;
  displayedColumns: string[] =
    ['id', 'title', 'director', 'duration', 'premiereDate', '3D', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private filmService: FilmService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getFilms();
  }

  private getFilms() {
    this.filmService.getAll().subscribe(f => {
      this.films = f.resources;

      this.dataSource = new MatTableDataSource<Film>(this.films);
      this.dataSource.sortingDataAccessor = getSortingDataAccessor();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  delete(film: Film) {
    this.filmService.delete(film).subscribe(_ => {
      this.getFilms();
    },
      _ => {
      this.snackBar.open("Error! This film is related to other existing object and could not be deleted.", "close", {
        duration: 5000
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(film: Film): void {
    const dialogRef = this.dialog.open(AddFilmComponent, {
      data: {film: film},
      height: '60%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getFilms();
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddFilmComponent, {
      data: {film: null},
      height: '60%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getFilms();
    });
  }

}
