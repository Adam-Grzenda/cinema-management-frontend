import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  dateRange: DateRange = new DateRange();

  @Input()
  sortDirection: string = SortDirection.BY_NAME_ASC

  availableDirections: string[] = Object.values(SortDirection)


  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  onDateEntered(): void {
    let dateStart = this.datePipe.transform(this.dateRange.dateStart, 'yyyy-MM-dd');
    let dateEnd = this.datePipe.transform(this.dateRange.dateEnd, 'yyyy-MM-dd');
    let route = this.activatedRoute.snapshot
    this.router.navigate([], {queryParams: {
      dateFrom: dateStart, dateTo: dateEnd,
      sort: route.queryParams['sort']}});
  }

  onSortChanged(): void {
    let route = this.activatedRoute.snapshot

    this.router.navigate([], {queryParams: {
      sort: this.sortDirection.replace(' ', ''),
        dateFrom: route.queryParams['dateFrom'],
        dateTo: route.queryParams['dateTo']
    }})

  }


}

class DateRange {
  dateStart: Date;
  dateEnd: Date;
}

export enum SortDirection {
  BY_PREMIERE_ASC = 'Premiere ASC',
  BY_PREMIERE_DESC = 'Premiere DESC',
  BY_NAME_ASC = 'Name ASC',
  BY_NAME_DESC = 'Name DESC',
}
