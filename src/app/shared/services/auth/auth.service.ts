import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import * as URL from '../../endpoints/auth';

interface AuthResponse {
  message: string;
  _id: string;
  token: string;
  email: string;
  name: string;
  surname: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject: BehaviorSubject<User>;
  authStatus$: Observable<User>;

  constructor(private http: HttpClient) {
    this.autoLogin();
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userSubject = new BehaviorSubject(user);
    } else {
      this.userSubject = new BehaviorSubject(null);
    }
    this.authStatus$ = this.userSubject.asObservable();
  }

  findUser(email: string) {
    return this.http.post<{ user: [] }>(URL.findUserURL, {
      email,
    });
  }

  signupUser(user) {
    return this.http.post<AuthResponse>(URL.signupURL, user).pipe(
      catchError(() => {
        return throwError('Signup error');
      })
    );
  }

  loginUser(credentials: { email: string; password: string }) {
    return this.http.post<AuthResponse>(URL.loginURL, credentials).pipe(
      catchError(() => {
        localStorage.setItem('user', null);
        return throwError('Auth failed');
      }),
      tap(response => {
        const user: User = {
          id: response._id,
          token: response.token,
          email: response.email,
          name: response.name,
          surname: response.surname,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
