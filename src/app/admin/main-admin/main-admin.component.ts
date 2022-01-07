import {Component, OnInit} from '@angular/core';
import {AdminListService} from "../../services/admin-list.service";
import {AdminList} from "../../../model/admin-list";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  typeList: AdminList[] = [];

  constructor(
    private adminListService: AdminListService,
  ) {
  }

  ngOnInit(): void {
    this.adminListService.getList().subscribe(list => {
      this.typeList = list;
    });
  }






}
