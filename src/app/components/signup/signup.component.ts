import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { debounceTime, map, take, switchMap } from 'rxjs/operators';

class EmailAsyncValidator {
  static email(auth: AuthService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
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
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
          ),
        ],
        EmailAsyncValidator.email(this.authService),
      ],
      password: ['', [Validators.required, Validators.min(5)]],
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
}
