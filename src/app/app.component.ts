import {Component} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.configure();
  }


  authConfig: AuthConfig = {
    issuer: 'http://localhost:8081/auth/realms/cinema-management',
    redirectUri: window.location.origin,
    clientId: 'cinema-management-frontend',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: true
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  title = 'cinema-management-client';


}


