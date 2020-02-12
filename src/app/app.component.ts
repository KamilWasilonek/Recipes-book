import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './shared/services/auth/auth.service';
import { SpinnerService } from './shared/services/spinners/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  isSpinnerOn: boolean;
  isUserLogged: boolean;

  constructor(private authService: AuthService, private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.loadingStatus$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.isSpinnerOn = response;
    });
    this.authService.authStatus$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.isUserLogged = !!user;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
