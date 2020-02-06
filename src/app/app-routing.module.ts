import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { MealsListComponent } from './modules/meals-list/meals-list.component';
import { MealDetailsComponent } from './modules/meal-details/meal-details.component';
import { NewMealComponent } from './modules/new-meal/new-meal.component';
import { LoggedGuardService } from './shared/services/logged-guard.service';

const routes: Routes = [
  { path: '', component: MealsListComponent, canActivate: [AuthGuardService] },
  { path: 'meals/:id', component: MealDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'new-meal', component: NewMealComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuardService] },
  { path: 'signup', component: SignupComponent, canActivate: [LoggedGuardService] },
  // { path: '', redirectTo: 'meals', pathMatch: 'full' },
  { path: '**', redirectTo: 'meals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
