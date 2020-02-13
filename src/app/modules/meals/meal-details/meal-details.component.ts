import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MealEditComponent } from '../meal-edit/meal-edit.component';
import { relative } from 'path';
import { SpinnerService } from 'src/app/shared/services/spinners/spinner.service';
import { MealsService } from 'src/app/shared/services/meals/meals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit, OnDestroy {
  meal: Meal;
  mealSubscription: Subscription;
  isAuthor: boolean;
  serverUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealsService: MealsService,
    private spinnerService: SpinnerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.serverUrl = environment.serverUrl;

    this.spinnerService.show();

    this.route.params.subscribe(params => {
      this.meal = this.mealsService.getSingleMeal(params.id);
      this.isAuthor = this.meal.author._id === JSON.parse(localStorage.getItem('user'))._id;
      this.spinnerService.hide();
    });
  }

  removeMeal(mealId) {
    this.mealsService.deleteMeal(mealId);
    this.router.navigate(['../', { relativeTo: this.route }]);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.meal;

    const dialogRef = this.dialog.open(MealEditComponent, dialogConfig);

    dialogRef.afterClosed();
  }

  ngOnDestroy() {
    this.mealSubscription.unsubscribe();
  }
}
