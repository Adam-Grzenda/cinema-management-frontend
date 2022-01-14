import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isUserLoggedIn()) {
      const assignedToCinema = route.params['cinema-id'];
      console.log("Assigned to cinema: " + assignedToCinema);
      return this.userService.currentUserHasRoleAndAssignedToCinema(route.data['role'], assignedToCinema);
    } else {
      this.userService.login();
      return false;
    }
  }

}
