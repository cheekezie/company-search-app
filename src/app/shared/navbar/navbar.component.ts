import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfileI } from 'src/app/utils/interfaces/auth.interface';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: UserProfileI | undefined;
  constructor(private _authS: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this._authS.userProfile;
  }

  goToLogin() {
    const url = this.router.url;
    this._authS.handleRouteToLogin(url);
  }
}
