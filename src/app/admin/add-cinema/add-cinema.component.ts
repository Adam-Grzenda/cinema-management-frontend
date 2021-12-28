import {Component, Input, OnInit} from '@angular/core';
import {Cinema} from "../../../model/cinema";
import {CinemaService} from "../../services/cinema.service";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit {

  cinemas: Cinema[] = [];

  @Input()
    cinema:Cinema = new Cinema();

  constructor(private cinemaService: CinemaService ) { }

  ngOnInit(): void {
  }

  save() {
    this.cinemaService.addCinema(this.cinema).
    subscribe((a)=>
    { console.log("saved:" + a.name);
      this.getCinemas()
    });


    this.cinema = new Cinema();
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(cinemas => this.cinemas = cinemas);

}
}
