import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  loadingSubject: BehaviorSubject<boolean>;
  loadingStatus$: Observable<boolean>;

  constructor() {
    this.loadingSubject = new BehaviorSubject(false);
    this.loadingStatus$ = this.loadingSubject.asObservable();
  }

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
