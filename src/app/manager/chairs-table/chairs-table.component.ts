import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Chair} from "../../../model/chair";
import {CinemaHallService} from "../../services/cinema-hall.service";
import {Sort} from "@angular/material/sort";
import {ChairService} from "../../services/chair.service";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-chairs-table',
  templateUrl: './chairs-table.component.html',
  styleUrls: ['./chairs-table.component.css']
})
export class ChairsTableComponent implements OnInit {

  //#TODO displaying issues

  @Input()
  hall_id: number;

  chairs: Chair[];

  sortedChairs: Chair[] = [];

  searchText: string = '';

  dataSource = new MatTableDataSource(this.sortedChairs)
  displayedColumns: ['id', 'hallRow', 'hallColumn', 'chairType'];

  dataSource2 = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private cinemaHallService: CinemaHallService,
    private chairService: ChairService
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

  delete(chair: Chair) {
    this.chairService.delete(chair).subscribe(c => {
      console.log("deleted: " + chair.id);
      this.getChairs(this.hall_id);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


