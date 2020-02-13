import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmailAsyncValidator } from 'src/app/shared/validators/emailAsyncValidator';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate-guard.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, CanComponentDeactivate {
  signupForm: FormGroup;
  signupStatus = null;
  isError = false;
  isFormSaved = false;
  isSpinnerOn = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,3})$'
          ),
        ],
        EmailAsyncValidator.email(this.authService),
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
  }

  signup() {
    this.signupStatus = this.signupStatus;
    this.isSpinnerOn = true;

    const user = {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
      surname: this.surname.value,
    };

    this.authService.signupUser(user).subscribe(
      response => {
        this.isSpinnerOn = false;
        this.isError = false;
        this.signupStatus = response.message;
        this.isFormSaved = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      err => {
        this.isSpinnerOn = false;
        this.isError = true;
        this.signupStatus = err;
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
}
