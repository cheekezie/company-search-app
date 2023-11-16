import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../utils/services/auth.service';
import { AlertService } from '../utils/services/alert.service';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading = false;
  constructor(
    private _authS: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _alert: AlertService
  ) {}

  onSubmit() {
    this.loading = true;
    // Add a delay to simulate real API call
    setTimeout(() => {
      this._authS.authenticateUser(this.form.value).subscribe({
        next: (res) => {
          localStorage.setItem(
            LocalStoreEnums.AUTHUSER,
            JSON.stringify(res.data)
          );
          this.loading = false;
          const returnUrl =
            this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          if (returnUrl) {
            this.router.navigate([returnUrl]);
            return;
          }
          this.router.navigate(['']);
        },
        error: (err) => {
          this._alert.error(err);
          this.loading = false;
        },
      });
    }, 1000);
  }
}
