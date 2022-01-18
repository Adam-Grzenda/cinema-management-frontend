import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FoodCourt} from "../../../../model/food-court";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CinemaService} from "../../../services/cinema.service";
import {MatDialog} from "@angular/material/dialog";
import {FoodCourtService} from "../../../services/food-court.service";
import {AddFoodCourtComponent} from "../../add-edit/add-food-court/add-food-court.component";

@Component({
  selector: 'app-food-court-table',
  templateUrl: './food-court-table.component.html',
  styleUrls: ['./food-court-table.component.css']
})
export class FoodCourtTableComponent implements OnInit {

  @Input()
  cinemaId: number;

  private courts: Array<FoodCourt>;

  dataSource: MatTableDataSource<FoodCourt>;
  displayedColumns: string[] =
    ['id', 'name', 'checkoutNumber', 'modify', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private foodCourtService: FoodCourtService,
    private cinemaService: CinemaService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getCourts();
  }

  private getCourts() {
    this.foodCourtService.getByCinemaId(this.cinemaId).subscribe(f => {
        this.courts = f.resources;

        this.dataSource = new MatTableDataSource<FoodCourt>(this.courts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  delete(court: FoodCourt) {
    this.foodCourtService.delete(court).subscribe(c => {
      this.getCourts();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modify(court: FoodCourt): void {
    const dialogRef = this.dialog.open(AddFoodCourtComponent, {
      data: {
        court: court,
        cinema_id: this.cinemaId
      },
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getCourts();
    });
  }

  add(): void {
    const dialogRef = this.dialog.open(AddFoodCourtComponent, {
      data: {
        court: null,
        cinema_id: this.cinemaId
      },
      height: '80%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.getCourts();
    });
  }

}
