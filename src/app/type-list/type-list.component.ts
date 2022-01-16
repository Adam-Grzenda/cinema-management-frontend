import {Component, Input, OnInit} from '@angular/core';
import {TypeList} from "../../model/type-list";

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {

  @Input()
  typeList: TypeList[];

  @Input()
  cinemaId: number = 0;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
