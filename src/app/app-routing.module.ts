import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealsListComponent } from './modules/meals-list/meals-list.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { MealDetailsComponent } from './modules/meal-details/meal-details.component';
import { NewMealComponent } from './modules/new-meal/new-meal.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { LoggedGuardService } from './shared/guards/logged-guard.service';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { CanDeactivateGuardService } from './shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  { path: '', component: MealsListComponent, canActivate: [AuthGuardService] },
  { path: 'meals/:id', component: MealDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'new-meal', component: NewMealComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuardService] },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedGuardService],
    canDeactivate: [CanDeactivateGuardService],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
