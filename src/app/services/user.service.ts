import {Injectable} from '@angular/core';
import {User} from "../../model/user";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getLoggedInUser(): Observable<User> {
    let user: User = new User();

    user.id = 1;
    user.name = 'John';
    user.surname = 'Smith';
    user.email = 'john.smith@mail.com';
    return of(user);
  }

}
