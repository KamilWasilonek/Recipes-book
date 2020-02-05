import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent {
  @Input() meal: Meal;
  @Output() removeMeal = new EventEmitter<string>();
  @Output() editMeal = new EventEmitter<string>();

  onMealRemove() {
    this.removeMeal.emit(this.meal._id);
  }

  onMealEdit() {
    this.editMeal.emit(this.meal._id);
  }
}
