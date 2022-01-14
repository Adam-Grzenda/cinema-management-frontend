import {Injectable} from '@angular/core';
import {User} from "../../model/user/user";
import {filter, Observable, of} from "rxjs";
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

  getTokenReceivedEvent(): Observable<any> {
    return this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)));
  }

}
