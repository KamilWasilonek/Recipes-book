import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Meal } from '../../models/meal';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  // const serverUrl = 'https://meals-node-api.herokuapp.com/meals';
  serverUrl = 'http://localhost:5000/meals';
  meals = [];
  mealsSubject: BehaviorSubject<Meal[]>;
  mealsList$: Observable<Meal[]>;

  constructor(private http: HttpClient) {
    this.mealsSubject = new BehaviorSubject([]);
    this.mealsList$ = this.mealsSubject.asObservable();
    this.getMeals().subscribe();
  }

  getMeals(): Observable<{ meals: Meal[] }> {
    return this.http.get(this.serverUrl).pipe(
      tap((data: { meals: Meal[] }) => {
        console.log(data);
        this.meals = data.meals;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  addMeal(newMeal) {
    const authorId = newMeal.author['_id'];

    const formData = new FormData();
    formData.append('image', newMeal.image, newMeal.image.name);
    formData.append('name', newMeal.name);
    formData.append('desc', newMeal.desc);
    formData.append('timeOfPreparation', newMeal.timeOfPreparation);
    formData.append('authorId', authorId);
    formData.append('authorName', newMeal.author.name);
    formData.append('authorSurname', newMeal.author.surname);

    return this.http.post<Meal>(this.serverUrl, formData).pipe(
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
    return this.http.put(`${this.serverUrl}${mealToUpdate._id}`, mealToUpdate).pipe(
      tap(response => {
        console.log(response);
        const mealId = this.meals.findIndex(item => item._id === mealToUpdate._id);
        this.meals[mealId] = mealToUpdate;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  deleteMeal(mealId) {
    if (confirm('Are you sure to delete?')) {
      this.http.delete(`${this.serverUrl}${mealId}`).subscribe(
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
}
