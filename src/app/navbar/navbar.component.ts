import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {User} from "../../model/user/user";
import {UserService} from "../services/user.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  sidebarToggleEvent = new EventEmitter<string>();

  currentUser: User;

  visible: boolean = true;

  constructor(
    private router: Router,
    public userService: UserService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((e)=>e instanceof NavigationEnd)).subscribe(n => {
      console.log(n)
      // @ts-ignore
      this.visible = n['urlAfterRedirects'].includes('/customer') && !n['urlAfterRedirects'].includes('orders')
    console.log(this.visible)
    })

    this.userService.getTokenReceivedEvent().subscribe(
      () => {
        this.userService.getCurrentUser().then(
          (value) => {
            this.currentUser = User.fromKeycloakUserInfo(value);
            //console.log(this.currentUser)
          }
        )
      }
    )


  }

  onToggleSidebar() {
    this.sidebarToggleEvent.emit("toggle");
  }

  goToOrders() {
    this.router.navigate(["customer","orders"])
  }

}
