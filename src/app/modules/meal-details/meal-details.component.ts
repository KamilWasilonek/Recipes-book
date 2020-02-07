import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsListService } from 'src/app/shared/services/meals-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit, OnDestroy {
  meal: Meal;
  mealId: string;
  mealSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsListService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.show();
    this.mealsService.getMeals();
    this.route.params.subscribe(params => {
      this.mealId = params.id;
    });
    this.mealSubscription = this.mealsService.mealsList$.subscribe(res => {
      if (res.length !== 0) {
        this.meal = this.mealsService.meals.filter(meal => meal._id === this.mealId)[0];
        console.log(this.meal);
        this.spinnerService.hide();
      }
    });
  }

  ngOnDestroy() {
    this.mealSubscription.unsubscribe();
  }
}
