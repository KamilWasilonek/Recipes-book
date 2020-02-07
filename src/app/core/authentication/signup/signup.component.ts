import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { debounceTime, map, take, switchMap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Subject, Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/services/can-deactivate-guard.service';

class EmailAsyncValidator {
  static email(auth: AuthService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(2000),
        take(1),
        switchMap(_ =>
          auth.findUser(control.value.toLowerCase()).pipe(
            map(response => {
              console.log(response);
              return response.user.length === 0 ? null : { emailTaken: true };
            })
          )
        )
      );
    };
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  signupForm: FormGroup;
  signupStatus = '';
  isError = false;
  isFormSaved = false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isSpinnerOn = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          ),
        ],
        EmailAsyncValidator.email(this.authService),
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
  }

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get name() {
    return this.signupForm.get('name');
  }
  get surname() {
    return this.signupForm.get('surname');
  }

  signup(signupForm) {
    this.signupStatus = '';
    this.isSpinnerOn = true;
    const controls = signupForm.controls;
    const user = {
      email: controls.email.value,
      password: controls.password.value,
      name: controls.name.value,
      surname: controls.surname.value,
    };

    this.authService.signupUser(user).subscribe(
      response => {
        this.isSpinnerOn = false;
        this.isError = false;
        this.signupStatus = 'User was registered';
        this.isFormSaved = true;
        // setTimeout(() => {
        //   this.router.navigate(['/login']);
        // }, 5000);
      },
      err => {
        this.isSpinnerOn = false;
        this.isError = false;
        this.signupStatus = 'Signup error';
        console.log(err);
      }
    );
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.signupForm.dirty && !this.isFormSaved) {
      return confirm('Do you want to leave page?');
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
