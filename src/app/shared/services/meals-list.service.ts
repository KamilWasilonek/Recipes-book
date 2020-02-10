import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Meal } from '../models/meal';
import { tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class MealsListService {
  testEndpoint = 'https://meals-node-api.herokuapp.com/';
  meals = [];
  mealsSubject: BehaviorSubject<Meal[]>;
  mealsList$: Observable<Meal[]>;

  constructor(private http: HttpClient) {
    this.mealsSubject = new BehaviorSubject([]);
    this.mealsList$ = this.mealsSubject.asObservable();
  }

  getMeals(): Observable<{ meals: Meal[] }> {
    const url = this.testEndpoint + 'meals';
    return this.http.get(url).pipe(
      tap((data: { meals: Meal[] }) => {
        this.meals = data.meals;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  addMeal(newMeal) {
    const url = this.testEndpoint + 'meals';

    const authorId = newMeal.author['_id'];
    const authorSurname = newMeal.author.surname;

    const formData = new FormData();
    formData.append('image', newMeal.image, newMeal.image.name);
    formData.append('name', newMeal.name);
    formData.append('desc', newMeal.desc);
    formData.append('timeOfPreparation', newMeal.timeOfPreparation);
    formData.append('authorId', authorId);
    formData.append('authorName', newMeal.author.name);
    formData.append('authorSurname', newMeal.author.surname);

    return this.http.post<Meal>(url, formData).pipe(
      tap(
        () => {
          this.meals.push(newMeal);
          this.mealsSubject.next(this.meals);
        },
        err => {
          console.log(err);
        }
      )
    );
  }

  updateMeal(mealToUpdate) {
    console.log(mealToUpdate);
    return this.http.put(`${this.testEndpoint}meals/${mealToUpdate._id}`, mealToUpdate).pipe(
      tap(response => {
        console.log(response);
        const mealId = this.meals.findIndex(item => item._id === mealToUpdate._id);
        this.meals[mealId] = mealToUpdate;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  deleteMeal(mealId) {
    this.http.delete(`${this.testEndpoint}meals/${mealId}`).subscribe(
      () => {
        this.meals = this.meals.filter(item => item._id !== mealId);
        this.mealsSubject.next(this.meals);
      },
      err => {
        console.log(err);
      }
    );
  }
}
