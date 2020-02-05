import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root',
})
export class MealsListService {
  meals = [];
  mealsSubject: BehaviorSubject<Meal[]>;
  

  constructor(private http: HttpClient) {
    this.mealsSubject = new BehaviorSubject([]);
  }

  getMeals(): void {
    const url = environment.ENDPOINT + 'meals';
    this.http.get(url).subscribe((data: { meals: Meal[] }) => {
      this.meals = data.meals;
      this.mealsSubject.next(this.meals);
    });
  }

  addMeal(newMeal) {
    const formData = new FormData();
    formData.append('image', newMeal.image, newMeal.image.name);
    formData.append('name', newMeal.name);
    formData.append('desc', newMeal.desc);
    this.http.post('http://localhost:5000/meals', formData).subscribe(
      res => {
        console.log(res);
        this.meals.push(newMeal);
        this.mealsSubject.next(this.meals);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteMeal(mealId) {
    this.http.delete(`${environment.ENDPOINT}meals/${mealId}`).subscribe(response => {
      console.log(response);
    });
  }
}
