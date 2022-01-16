import {KeycloakUser} from "./keycloak-user";

export class User {
  id: string;
  email: string;
  name: string;
  surname: string;
  roles: string[];
  cinema: number;

  static fromKeycloakUserInfo(keycloakUserInfo: any): User {
    let userInfo: KeycloakUser = new KeycloakUser();
    Object.assign(userInfo, keycloakUserInfo);
    let user = new User();
    user.id = userInfo.info.sub;
    user.email = userInfo.info.email;
    user.name = userInfo.info.given_name;
    user.surname = userInfo.info.family_name;
    user.roles = userInfo.info.resource_access["cinema-management-frontend"].roles;
    user.cinema = userInfo.info.cinema;
    return user;
  }

  hasRole(role: string) {
    return this.roles.includes(role);
  }
}
