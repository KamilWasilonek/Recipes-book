import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, concat } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { SpinnerService } from 'src/app/shared/services/spinners/spinner.service';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit, OnDestroy {
  meal: Meal = null;
  mealId: string;
  mealSubscription: Subscription;
  isAuthor: boolean;
  serverUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealsService: MealsService,
    private spinnerService: SpinnerService,
    private editService: EditService
  ) {}

  ngOnInit() {
    this.serverUrl = environment.serverUrl;

    this.spinnerService.show();

    this.mealSubscription = this.mealsService.mealsList$.subscribe(res => {
      if (res !== null) {
        this.meal = this.mealsService.getSingleMeal(this.route.snapshot.params.id);
        if (this.meal) {
          this.isAuthor = this.meal.author._id === JSON.parse(localStorage.getItem('user'))._id;
          this.openDialog();
        }
        this.spinnerService.hide();
      }
    });
  }

  removeMeal(mealId) {
    this.mealsService.deleteMeal(mealId).subscribe(
      () => {
        this.router.navigate(['/meals']);
      },
      err => {
        console.log(err);
      }
    );
  }

  openDialog() {
    this.editService.openDialog(this.meal);
  }

  backToList() {
    this.router.navigate(['/meals']);
  }

  ngOnDestroy() {
    this.mealSubscription.unsubscribe();
  }
}
