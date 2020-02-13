import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './shared/guards/auth-guard.service';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { LoggedGuardService } from './shared/guards/logged-guard.service';

const routes: Routes = [
  {
    path: 'meals',
    loadChildren: './modules/meals/meals.module#MealsModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    canActivate: [LoggedGuardService],
  },
  {
    path: 'signup',
    loadChildren: './modules/signup/signup.module#SignupModule',
    canActivate: [LoggedGuardService],
  },
  { path: '', redirectTo: '/meals', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
