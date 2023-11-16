import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router, private _authS: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loggedin = this._authS.isLoggedIn;

    if (loggedin) {
      return true;
    }

    this._authS.handleRouteToLogin(state.url);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
