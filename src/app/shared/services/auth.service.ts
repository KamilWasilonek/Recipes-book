import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

interface LoginResponse {
  message: string;
  token: string;
  _id: string;
  email: string;
  name: string;
  surname: string;
}

interface SignupResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  testEndpoint = 'https://meals-node-api.herokuapp.com/';

  isUserLogged: boolean;
  loginSubject: BehaviorSubject<boolean>;
  loginStatus$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isUserLogged = localStorage.getItem('userToken') ? true : false;
    this.loginSubject = new BehaviorSubject(this.isUserLogged);
    this.loginStatus$ = this.loginSubject.asObservable();
    this.loginSubject.next(this.isUserLogged);
  }

  findUser(email: string) {
    return this.http.post<{ user: [] }>(this.testEndpoint + 'user/findUser', {
      email,
    });
  }

  signupUser(user) {
    const url = this.testEndpoint + 'user/signup';
    return this.http.post(url, user);
  }

  loginUser(credentials: { email: string; password: string }) {
    const url = this.testEndpoint + 'user/login';
    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap(
        response => {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              _id: response._id,
              email: response.email,
              name: response.name,
              surname: response.surname,
            })
          );
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
    localStorage.removeItem('userDetails');
    this.isUserLogged = false;
    this.loginSubject.next(this.isUserLogged);
  }
}
