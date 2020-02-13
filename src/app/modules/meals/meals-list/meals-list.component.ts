import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatPaginator, PageEvent } from '@angular/material';
import { MealEditComponent } from '../meal-edit/meal-edit.component';
import { MealsService } from 'src/app/shared/services/meals/meals.service';

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

  mealSubscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.mealsService.getMeals().subscribe(() => {
      this.mealSubscription = this.mealsService.mealsList$.subscribe(meals => {
        this.meals = meals;
        this.currentMeals = this.meals.slice(
          this.pageIndex * this.pageSize,
          (this.pageIndex + 1) * this.pageSize
        );
      });
    });
  }

  goToDetails(mealId) {
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

    dialogRef.afterClosed();
  }

  ngOnDestroy() {}

  getNext(event: PageEvent): void {
    this.currentMeals = this.meals.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
