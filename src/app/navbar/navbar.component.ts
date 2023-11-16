import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../utils/services/auth.service';
import { UserProfileI } from '../utils/interfaces/auth.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  user: UserProfileI | undefined;
  constructor(private _authS: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this._authS.userProfile;
  }

  goToLogin() {
    const url = this.router.url.split('/')[1];
    const queryParams = {
      returnUrl: url || '',
    };
    this.router.navigate(['/login'], {
      queryParams,
    });
  }
}
