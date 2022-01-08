import {Component, OnInit} from '@angular/core';
import {ManagerListService} from "../../services/manager-list.service";
import {TypeList} from "../../../model/type-list";
import {ActivatedRoute} from "@angular/router";
import {CinemaService} from "../../services/cinema.service";

@Component({
  selector: 'app-main-manager',
  templateUrl: './main-manager.component.html',
  styleUrls: ['./main-manager.component.css']
})
export class MainManagerComponent implements OnInit {

  public id: number;
  public title: string;

  typeList: TypeList[] = [];

  constructor(
    private managerListService: ManagerListService,
    private cinemaService: CinemaService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['cinema-id'];
    this.setTitle()
    console.log(this.id)

    this.managerListService.getList(this.id).subscribe(list => {
      this.typeList = list;
      //console.log(this.typeList)
    });
  }

  setTitle(): void {
    this.cinemaService.getOne(this.id).subscribe(c=> this.title = c.name);

  }

}
