import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Meal } from 'src/app/shared/models/meal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss'],
})
export class MealEditComponent implements OnInit {
  meal: Meal;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MealEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.meal = data;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [this.meal.name, []],
      desc: [this.meal.desc, []],
    });
  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
