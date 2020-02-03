import { Component, OnInit } from '@angular/core';
import { MealsListService } from 'src/app/shared/services/meals-list.service';
import { Subscription, Observable } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit {
  meals$: Observable<Meal[]>;
  mealsList: Meal[];

  constructor(private mealsService: MealsListService) {}

  ngOnInit() {
    this.meals$ = this.mealsService.getMeals().pipe(tap(({meals}) => {
      this.mealsList = meals;
    }));
  }
}
