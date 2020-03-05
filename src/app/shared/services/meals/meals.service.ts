import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, from } from 'rxjs';
import {
  tap,
  switchMap,
} from 'rxjs/operators';
import { Meal } from '../../models/meal';
import { environment } from 'src/environments/environment';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  serverUrl = `${environment.serverUrl}meals/`;
  meals = [];
  mealsSubject: BehaviorSubject<Meal[]>;
  mealsList$: Observable<Meal[]>;

  task: AngularFireUploadTask;
  ref;
  uploadProgress;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private http: HttpClient,
    private afStorage: AngularFireStorage
  ) {
    this.mealsSubject = new BehaviorSubject([]);
    this.mealsList$ = this.mealsSubject.asObservable();
    this.getMeals().subscribe();
  }

  getMeals(): Observable<{ meals: Meal[] }> {
    return this.http.get(this.serverUrl).pipe(
      tap((data: { meals: Meal[] }) => {
        this.meals = data.meals;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  addMeal(newMeal) {
    return this.uploadMealImage(newMeal.image).pipe(
      switchMap(url => {
        newMeal = {
          ...newMeal,
          image: url,
        };

        return this.http.post<{ meal: Meal }>(this.serverUrl, newMeal).pipe(
          tap(
            response => {
              this.meals.push(response.meal);
              this.mealsSubject.next(this.meals);
            }
          )
        );
      })
    );
  }

  saveMeal(meal, form) {
    return this.http.post<Meal>(this.serverUrl, form).pipe(
      tap(
        () => {
          this.meals.push(meal);
          this.mealsSubject.next(this.meals);
        },
      )
    );
  }

  private uploadMealImage(image: File) {
    this.ref = this.afStorage.ref(image.name);

    return from(
      from(this.ref.put(image)).pipe(
        switchMap((response: any) => {
          return response.ref.getDownloadURL();
        })
      )
    );
  }

  updateMeal(mealToUpdate) {
    return this.http.put(`${this.serverUrl}${mealToUpdate._id}`, mealToUpdate).pipe(
      tap(() => {
        const mealId = this.meals.findIndex(item => item._id === mealToUpdate._id);
        this.meals[mealId] = mealToUpdate;
        this.mealsSubject.next(this.meals);
      })
    );
  }

  deleteMeal(mealId) {
    if (confirm('Are you sure to delete?')) {
      return this.http.delete(`${this.serverUrl}${mealId}`).pipe(
        tap(
          () => {
            this.meals = this.meals.filter(item => item._id !== mealId);
            this.mealsSubject.next(this.meals);
          },
        )
      );
    } else {
      throwError('Canceled');
    }
  }

  getSingleMeal(mealId: string): Meal {
    return this.meals[this.meals.findIndex(item => item._id === mealId)];
  }
}
