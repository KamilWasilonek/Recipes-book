import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Meal } from 'src/app/shared/models/meal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealComponent implements OnInit {
  @Input() meal: Meal;
  @Output() removeMeal = new EventEmitter<string>();
  @Output() editMeal = new EventEmitter<string>();
  @Output() goDetails = new EventEmitter<string>();
  serverUrl: string;

  ngOnInit() {
    this.serverUrl = environment.serverUrl;
  }

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
