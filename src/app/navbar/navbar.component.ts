import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  sidebarToggleEvent = new EventEmitter<string>();

  currentUser: User;

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getTokenReceivedEvent().subscribe(
      () => {
        this.userService.getCurrentUser().then(
          (value) =>
          {
            this.currentUser = User.fromKeycloakUserInfo(value);
            console.log(this.currentUser)
          }
        )
      }
    )

  }

  onToggleSidebar() {
    this.sidebarToggleEvent.emit("toggle");
  }
}
