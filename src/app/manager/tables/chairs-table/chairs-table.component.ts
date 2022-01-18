import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chair} from "../../../../model/chair";
import {CinemaHallService} from "../../../services/cinema-hall.service";
import {MatSort, Sort} from "@angular/material/sort";
import {ChairService} from "../../../services/chair.service";
import {MatTableDataSource} from "@angular/material/table";
import {CinemaHall} from "../../../../model/cinema-hall";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ChairTypeComponent} from "../../add-edit/chair-type/chair-type.component";
import {AddChairsComponent} from "../../add-edit/add-chairs/add-chairs.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-chairs-table',
  templateUrl: './chairs-table.component.html',
  styleUrls: ['./chairs-table.component.css']
})
export class ChairsTableComponent implements OnInit {

  @Input()
  hall: CinemaHall;

  private chairs: any;

  dataSource: MatTableDataSource<Chair>;
  displayedColumns: string[] = ['id', 'hallRow', 'hallColumn', 'chairType', 'modify', 'delete'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cinemaHallService: CinemaHallService,
    private chairService: ChairService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getChairs(this.hall.id);
  }


  getChairs(id: number): void {
    this.cinemaHallService.getAllSub(id).subscribe(c => {
      this.chairs = c.resources;
      this.dataSource = new MatTableDataSource(this.chairs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(chair: Chair) {
    this.chairService.delete(chair).subscribe(_ => {
        this.getChairs(this.hall.id);
      },
      _ => {

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(chair: Chair): void {
    const dialogRef = this.dialog.open(ChairTypeComponent, {
      data: {chair: chair},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getChairs(this.hall.id);
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddChairsComponent, {
      data: {hallId: this.hall.id},
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getChairs(this.hall.id);
    });
  }
}

