import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  sidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
