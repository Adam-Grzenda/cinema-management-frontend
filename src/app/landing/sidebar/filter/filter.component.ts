import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  dateRange : DateRange = new DateRange();


  constructor(
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onDateEntered() : void {
    let dateStart = this.datePipe.transform(this.dateRange.dateStart, 'yyyy-MM-dd');
    let dateEnd = this.datePipe.transform(this.dateRange.dateEnd, 'yyyy-MM-dd');
    this.router.navigate([], {queryParams: {dateFrom: dateStart, dateTo: dateEnd}});
  }

}

class DateRange {
  dateStart: Date;
  dateEnd: Date;
}
