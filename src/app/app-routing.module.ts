import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { MealsListComponent } from './componentns/meals-list/meals-list.component';

const routes: Routes = [
  { path: 'meals', component: MealsListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
  { path: '**', redirectTo: 'meals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
