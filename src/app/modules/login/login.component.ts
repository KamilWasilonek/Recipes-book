import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinners/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginErrorMessage = null;
  returnUrl: string;
  isSpinnerOn: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.controlSpinner();

    this.createLoginForm();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  controlSpinner() {
    this.spinnerService.loadingStatus$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.isSpinnerOn = response;
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9_\.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    const credentials = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.loginUser(credentials).subscribe(
      () => {
        this.loginErrorMessage = null;
        this.router.navigate(['/meals']);
      },
      err => {
        this.loginErrorMessage = err;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
