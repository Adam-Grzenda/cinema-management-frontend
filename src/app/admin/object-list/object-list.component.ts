import {Component, Input, OnInit} from '@angular/core';
import {AdminList} from "../../../model/admin-list";

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  @Input()
  type: AdminList;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }


}
