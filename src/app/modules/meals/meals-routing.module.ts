import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsListComponent } from './meals-list/meals-list.component';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { NewMealComponent } from './new-meal/new-meal.component';

const routes: Routes = [
  { path: '', component: MealsListComponent },
  { path: 'new', component: NewMealComponent },
  { path: ':id', component: MealDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
