import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debounceTime, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isEmailAvailabe(email: string) {
    return this.http.post<{ isEmailAvailable: boolean }>(environment.ENDPOINT + 'user/checkEmail', {
      email,
    });
  }
}
