import { Injectable } from '@angular/core';
import { LocalStoreEnums } from '../enums/store.enum';
import { LoginI, UserProfileI } from '../interfaces/auth.interface';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  get isLoggedIn() {
    const user = localStorage.getItem(LocalStoreEnums.AUTHUSER);
    return !!user;
  }

  get userProfile() {
    const user = localStorage.getItem(LocalStoreEnums.AUTHUSER);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  authenticateUser(data: LoginI) {
    const user = {
      username: 'harrison',
      name: 'Harrison chikezie Ugwu',
      password: '123456',
    };
    const { password, ...userWithoutPassword } = user;
    if (
      user.username === data.username.toLowerCase() &&
      password === data.password.toLowerCase()
    ) {
      return of<{ data: UserProfileI }>({ data: userWithoutPassword });
    }
    return throwError(() => new Error('Invalid login details'));
  }
}
