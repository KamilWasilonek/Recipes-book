import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLogged: boolean;
  loginSubject: BehaviorSubject<boolean>;
  loginStatus: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isUserLogged = localStorage.getItem('userToken') ? true : false;
    this.loginSubject = new BehaviorSubject(this.isUserLogged);
    this.loginStatus = this.loginSubject.asObservable();
    this.loginSubject.next(this.isUserLogged);
  }

  findUser(email: string) {
    return this.http.post<{ user: [] }>(environment.ENDPOINT + 'user/findUser', {
      email,
    });
  }

  loginUser(credentials: { email: string; password: string }) {
    const url = environment.ENDPOINT + 'user/login';
    return this.http.post<{ message: string; token: string }>(url, credentials).pipe(
      tap(
        response => {
          localStorage.setItem('userToken', response.token);
          this.isUserLogged = true;
        },
        err => {
          this.isUserLogged = false;
        },
        () => {
          this.loginSubject.next(this.isUserLogged);
        }
      )
    );
  }

  logoutUser() {
    localStorage.removeItem('userToken');
    this.isUserLogged = false;
    this.loginSubject.next(this.isUserLogged);
  }
}
