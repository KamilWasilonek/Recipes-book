import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignupComponent } from './core/authentication/signup/signup.component';
import { MealsListComponent } from './modules/meals-list/meals-list.component';
import { MealDetailsComponent } from './modules/meal-details/meal-details.component';
import { NewMealComponent } from './modules/new-meal/new-meal.component';
import { SidenavListComponent } from './core/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MealEditComponent } from './modules/meal-edit/meal-edit.component';
import { MealComponent } from './modules/meals-list/meal/meal.component';
import { HttpInterceptorService } from './shared/interceptors/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MealsListComponent,
    HeaderComponent,
    MealDetailsComponent,
    NewMealComponent,
    SidenavListComponent,
    MealEditComponent,
    MealComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angular Material
    SharedModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  entryComponents: [MealEditComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
