import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { MealsModule } from './modules/meals/meals.module';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { SignupModule } from './modules/signup/signup.module';
import { LoginModule } from './modules/login/login.module';
import { LoggedGuardService } from './shared/guards/logged-guard.service';

const routes: Routes = [
  {
    path: 'meals',
    loadChildren: () => import('./modules/meals/meals.module').then(m => MealsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => LoginModule),
    canActivate: [LoggedGuardService],
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => SignupModule),
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
