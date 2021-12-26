import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  sidebarToggleEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidebar() {
    this.sidebarToggleEvent.emit("toggle");
  }

}
