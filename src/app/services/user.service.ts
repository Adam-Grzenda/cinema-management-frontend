import {Injectable} from '@angular/core';
import {User} from "../../model/user/user";
import {filter, map, Observable, of} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private oauthService: OAuthService) { }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isUserLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  getCurrentUser(): Promise<Object> {
    return this.oauthService.loadUserProfile()
  }

  currentUserHasRole(role: String) {
    console.log("In current user has role")
    return this.getCurrentUser().then(
      (value) => {
          let user: User = User.fromKeycloakUserInfo(value);
          return true;
      }
    )
  }

  getTokenReceivedEvent(): Observable<any> {
    return this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)));
  }

}
