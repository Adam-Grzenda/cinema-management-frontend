export class KeycloakUser {
  info: UserInfo
}

export class UserInfo {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
}
