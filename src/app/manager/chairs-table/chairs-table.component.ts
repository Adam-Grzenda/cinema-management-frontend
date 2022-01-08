import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Chair} from "../../../model/chair";
import {CinemaHallService} from "../../services/cinema-hall.service";
import {Sort} from "@angular/material/sort";
import {ChairService} from "../../services/chair.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-chairs-table',
  templateUrl: './chairs-table.component.html',
  styleUrls: ['./chairs-table.component.css']
})
export class ChairsTableComponent implements OnInit {
  //@ViewChild(MdbTableDirective, {static: true}) mdbTable:MdbTableDirective;

  @Input()
  hall_id: number;

  chairs: Chair[];

  sortedChairs: Chair[];

  searchText: string = '';
  previous: string;

  dataSource: MatTableDataSource<Chair>;

  constructor(
    private cinemaHallService: CinemaHallService,
    private chairService:ChairService
  ) {
  }

  ngOnInit(): void {
    this.getChairs(this.hall_id);
  }


  getChairs(id: number): void {
    this.cinemaHallService.getAllSub(id).subscribe(c => {
      this.chairs = c.resources;
      this.sortedChairs = this.chairs.slice()
      console.log(this.chairs)
      this.dataSource = new MatTableDataSource(this.sortedChairs);
    })
  }

  sortData(sort: Sort) {
    const data = this.chairs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedChairs = data;
      return;
    }

    this.sortedChairs = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'hallRow':
          return compare(a.hallRow, b.hallRow, isAsc);
        case 'hallColumn':
          return compare(a.hallColumn, b.hallColumn, isAsc);
        case 'chairType':
          return compare(a.chairType, b.chairType, isAsc);
        default:
          return 0;
      }
    })
  }

  search() {
    //const prev = this.
  }

  delete(chair: Chair) {
    this.chairService.delete(chair).subscribe(c => {
      console.log("deleted: " + chair.id);
      this.getChairs(this.hall_id);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


