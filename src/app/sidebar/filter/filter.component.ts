import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  dateRange : DateRange = new DateRange();


  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  onStartDateEntered() : void {
    console.log("Start date: " + this.datePipe.transform(this.dateRange.dateStart, 'dd-MM-yyyy') )
  }

  onEndDateEntered() : void {
    console.log("End date: " + this.datePipe.transform(this.dateRange.dateEnd, 'dd-MM-yyyy'))
  }

}

class DateRange {
  dateStart: Date;
  dateEnd: Date;
}
