import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm: FormGroup;
  isLoginError = false;
  returnUrl: string;
  isSpinnerOn: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.loadingStatus$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.isSpinnerOn = response;
    });
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/meals';
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login(loginForm) {
    const credentials = {
      email: loginForm.controls.email.value,
      password: loginForm.controls.password.value,
    };
    this.authService
      .loginUser(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          console.log('Login status');
          this.isLoginError = false;
          this.router.navigateByUrl(this.returnUrl);
          console.log(this.isLoginError);
        },
        err => {
          console.log('Error login status');
          this.isLoginError = true;
        }
      );
    // this.authService.loginStatus.pipe(takeUntil(this.destroy$)).subscribe(response => {
    //   this.status = response;
    // });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
