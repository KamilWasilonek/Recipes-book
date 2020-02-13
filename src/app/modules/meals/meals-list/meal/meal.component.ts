import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent {
  @Input() meal: Meal;
  @Output() removeMeal = new EventEmitter<string>();
  @Output() editMeal = new EventEmitter<string>();
  @Output() goDetails = new EventEmitter<string>();

  onMealRemove() {
    this.removeMeal.emit(this.meal._id);
  }

  onMealEdit() {
    this.editMeal.emit(this.meal._id);
  }

  goToDetails(mealId) {
    this.goDetails.emit(mealId);
  }

  checkUser() {
    return this.meal.author._id === JSON.parse(localStorage.getItem('user'))._id;
  }
}
