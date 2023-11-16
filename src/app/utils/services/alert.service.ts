import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  succes(msg: string, position: MatSnackBarVerticalPosition = 'top'): void {
    this.snackbarConfig('Success', msg, 'success-snackbar', position);
  }

  error(msg: string, position: MatSnackBarVerticalPosition = 'top'): void {
    this.snackbarConfig('Error', msg, 'error-snackbar', position);
  }

  warning(msg: string, position: MatSnackBarVerticalPosition = 'top'): void {
    this.snackbarConfig('Warning', msg, 'warning-snackbar', position);
  }

  snackbarConfig(
    title: string,
    msg: string,
    theme: string,
    position: MatSnackBarVerticalPosition
  ): void {
    this.snackBar.open(title, msg, {
      duration: 7000,
      verticalPosition: position,
      panelClass: [theme],
    });
  }
}
