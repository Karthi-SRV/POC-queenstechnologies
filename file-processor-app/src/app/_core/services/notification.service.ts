import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackBarComponent } from './icon-snack-bar/icon-snack-bar.component';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  openSuccessSnackBar(message: string, action = 'X'): any {
    this.snackBar.openFromComponent(IconSnackBarComponent,
      {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        data: {
          message,
          icon: 'done',
          isSuccess: true
        },
      },
    );

  }

  openErrorSnackBar(errorMessage: string, action = 'X'): any {
    this.snackBar.openFromComponent(IconSnackBarComponent, {
      data: {
        message: errorMessage,
        icon: 'close',
        isSuccess: false
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
