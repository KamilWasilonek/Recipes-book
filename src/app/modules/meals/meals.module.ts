import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MealsListComponent } from './meals-list/meals-list.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { NewMealComponent } from './new-meal/new-meal.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealComponent } from './meals-list/meal/meal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { EditService } from './edit.service';

@NgModule({
  declarations: [
    MealsListComponent,
    MealDetailsComponent,
    NewMealComponent,
    MealEditComponent,
    MealComponent,
  ],
  imports: [MealsRoutingModule, SharedModule, HttpClientModule, FormsModule],
  providers: [EditService],
  entryComponents: [MealEditComponent],
})
export class MealsModule {}
