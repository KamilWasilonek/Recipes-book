import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Meal } from 'src/app/shared/models/meal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealsListService } from 'src/app/shared/services/meals-list.service';

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
    private mealServiece: MealsListService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.meal = data;
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [this.meal.name, Validators.required],
      desc: [this.meal.desc, Validators.required],
      timeOfPreparation: [
        this.meal.timeOfPreparation,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  save() {
    this.dialogRef.close(this.editForm.value);
    const meal = {
      ...this.meal,
      name: this.name.value,
      desc: this.desc.value,
      timeOfPreparation: this.timeOfPreparation.value,
    };
    console.log(meal);
    this.mealServiece.updateMeal(meal).subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  get name() {
    return this.editForm.get('name');
  }

  get desc() {
    return this.editForm.get('desc');
  }

  get timeOfPreparation() {
    return this.editForm.get('timeOfPreparation');
  }
}
