import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealsListService {
  constructor(private http: HttpClient) {}

  getMeals(): Observable<any> {
    const url = environment.ENDPOINT + 'meals';
    return this.http.get(url);
  }
}
