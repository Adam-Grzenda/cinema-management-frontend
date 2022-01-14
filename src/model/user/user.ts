import {KeycloakUser} from "./keycloak-user";

export class User {
  id: string;
  email: string;
  name: string;
  surname: string;

  static fromKeycloakUserInfo(keycloakUserInfo: any): User {
    let userInfo: KeycloakUser = new KeycloakUser();
    Object.assign(userInfo, keycloakUserInfo);
    let user = new User();
    user.id = userInfo.info.sub;
    user.email = userInfo.info.email;
    user.name = userInfo.info.given_name;
    user.surname = userInfo.info.family_name;
    return user;
  }
}
