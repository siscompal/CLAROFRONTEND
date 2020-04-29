import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  configuration: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


  success(msg: any) {
    this.configuration['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.configuration);
  }

  warn(msg: any) {
    this.configuration['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.configuration);
  }
}