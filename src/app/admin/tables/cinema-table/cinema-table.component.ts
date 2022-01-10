import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CinemaService} from "../../../services/cinema.service";
import {MatDialog} from "@angular/material/dialog";
import {Cinema} from "../../../../model/cinema";
import {AddCinemaComponent} from "../../add-edit/add-cinema/add-cinema.component";

@Component({
  selector: 'app-cinema-table',
  templateUrl: './cinema-table.component.html',
  styleUrls: ['./cinema-table.component.css']
})
export class CinemaTableComponent implements OnInit {

  private cinemas: Array<Cinema>;

  dataSource: MatTableDataSource<Cinema>;
  displayedColumns: string[] = ['id', 'name', 'address', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cinemaService: CinemaService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getCinemas();
  }

  private getCinemas() {
    this.cinemaService.getAll().subscribe(c => {
        this.cinemas = c.resources;
        this.dataSource = new MatTableDataSource<Cinema>(this.cinemas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  delete(cinema: Cinema) {
    this.cinemaService.delete(cinema).subscribe(c => {
      console.log("deleted: " + c.id);
      this.getCinemas();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(cinema: Cinema): void {
    const dialogRef = this.dialog.open(AddCinemaComponent, {
      data: {cinema: cinema},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getCinemas();
    })
  }

  add() {
    const dialogRef = this.dialog.open(AddCinemaComponent, {
      data: {cinema: null},
      height: '80%',
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(_=> {
      this.getCinemas();
    })

  }
}
