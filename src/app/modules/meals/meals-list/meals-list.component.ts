import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { SpinnerService } from 'src/app/shared/services/spinners/spinner.service';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  meals: Meal[] = [];
  currentMeals: Meal[] = [];

  pageIndex = 0;
  pageSize = 4;
  pageSizeOptions = [4, 8];

  filterParams = '';

  mealSubscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private spinnerService: SpinnerService,
    private editService: EditService
  ) {}

  ngOnInit() {
    this.loadMeals();
  }

  loadMeals() {
    this.mealSubscription = this.mealsService.mealsList$.subscribe(meals => {
      this.meals = meals;
      this.currentMeals = this.meals.slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize
      );
    });
  }

  goToDetails(mealId) {
    this.router.navigate(['/meals', mealId]);
  }

  removeMeal(mealId) {
    this.mealsService.deleteMeal(mealId).subscribe();
  }

  openDialog(mealId) {
    const meal = this.mealsService.getSingleMeal(mealId);
    this.editService.openDialog(meal);
  }

  getNext(event: PageEvent): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.currentMeals = this.meals.slice(
        event.pageIndex * event.pageSize,
        (event.pageIndex + 1) * event.pageSize
      );
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.spinnerService.hide();
    }, 500);
  }

  ngOnDestroy() {
    if(this.mealSubscription) {
      this.mealSubscription.unsubscribe()
    }
  }
}
