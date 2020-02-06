import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';

interface LoginResponse {
  message: string;
  token: string;
  email: string;
  name: string;
  surname: string;
}

interface SignupResponse {
  token: string,
}

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

  signupUser(user) {
    console.log(user);
    const url = environment.ENDPOINT + 'user/signup';
    return this.http.post(url, user);
  }

  loginUser(credentials: { email: string; password: string }) {
    const url = environment.ENDPOINT + 'user/login';
    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap(
        response => {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem(
            'userDetails',
            JSON.stringify({
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
    console.log(3);
    localStorage.removeItem('userToken');
    this.isUserLogged = false;
    this.loginSubject.next(this.isUserLogged);
  }
}
