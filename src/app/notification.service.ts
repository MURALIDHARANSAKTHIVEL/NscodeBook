import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notificationMessage: Subject<string> = new Subject();
  public statusFlag: boolean = true;
  constructor(private snackbar: MatSnackBar) {
    this.notificationMessage.subscribe(message => {
      let barconfig = new MatSnackBarConfig();
      barconfig.duration = 2000;
      barconfig.panelClass = this.statusFlag ? ['snack-success'] : ['snack-error'];
      barconfig.horizontalPosition = 'right';
      barconfig.verticalPosition = 'top';
      let actionElement = '';
      this.snackbar.open(message, actionElement, barconfig);

    })

  }


}
