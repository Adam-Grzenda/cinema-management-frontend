import {Component, OnInit, ViewChild} from '@angular/core';
import {Cinema} from "../../../../model/cinema";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CinemaHall} from "../../../../model/cinema-hall";
import {CinemaService} from "../../../services/cinema.service";
import {MatDialog} from "@angular/material/dialog";
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {AddCinemaHallComponent} from "../../add-edit/add-cinema-hall/add-cinema-hall.component";

@Component({
  selector: 'app-cinema-hall-table',
  templateUrl: './cinema-hall-table.component.html',
  styleUrls: ['./cinema-hall-table.component.css']
})
export class CinemaHallTableComponent implements OnInit {

  private halls: Array<CinemaHall>

  dataSource: MatTableDataSource<CinemaHall>;
  displayedColumns: string[] = ['id', 'number', 'type', 'cinema_id', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cinemaHallService:CinemaHallService,
    private cinemaService: CinemaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getHalls();
  }

  private getHalls() {
    this.cinemaHallService.getAll().subscribe(h => {
        this.halls = h.resources;
        for (let hall of this.halls) {
          hall.getRelation<Cinema>('cinema').subscribe(c => {
            hall.cinema = c;
            //#TODO dziwne errory, ale działa
          })
      }
        this.dataSource = new MatTableDataSource<CinemaHall>(this.halls);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  delete(hall: CinemaHall) {
    this.cinemaHallService.delete(hall).subscribe(h => {
      console.log("deleted: " + h.id);
      this.getHalls();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(hall: CinemaHall): void {
    const dialogRef = this.dialog.open(AddCinemaHallComponent, {
      data: {hall: hall},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_=> {
      this.getHalls();
    })
  }

  add() {
    const dialogRef = this.dialog.open(AddCinemaHallComponent, {
      data: {hall: null},
      height: '80%',
      width: '50%'
    })

    dialogRef.afterClosed().subscribe(_=> {
      this.getHalls();
    })

  }

}
