import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsListService } from 'src/app/shared/services/meals-list.service';
import { Subscription, Observable } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MealEditComponent } from '../meal-edit/meal-edit.component';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  meals: Meal[];

  mealSubscription: Subscription;

  constructor(
    private mealsService: MealsListService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.mealsService.getMeals();
    this.mealSubscription = this.mealsService.mealsList$.subscribe(res => {
      this.meals = res;
    });
  }

  goToDetails(mealId) {
    console.log(mealId);
    this.router.navigate([`meals`, mealId]);
  }

  removeMeal(mealId) {
    this.mealsService.deleteMeal(mealId);
  }

  openDialog(mealId) {
    const dialogConfig = new MatDialogConfig();

    const meal = this.mealsService.meals.filter(item => item._id === mealId)[0];

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = meal;

    const dialogRef = this.dialog.open(MealEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log('OUTPUT: ', data);
    });
  }

  ngOnDestroy() {
    this.mealSubscription.unsubscribe();
  }
}
