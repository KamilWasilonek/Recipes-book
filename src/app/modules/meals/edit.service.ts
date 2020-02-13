import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MealEditComponent } from './meal-edit/meal-edit.component';

@Injectable()
export class EditService {
  constructor(private dialog: MatDialog) {}

  openDialog(mealToEdit) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = mealToEdit;

    const dialogRef = this.dialog.open(MealEditComponent, dialogConfig);

    dialogRef.afterClosed();
  }
}
