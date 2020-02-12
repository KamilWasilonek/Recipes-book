import { debounceTime, map, take, switchMap } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

export class EmailAsyncValidator {
  static email(auth: AuthService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(2000),
        take(1),
        switchMap(_ =>
          auth.findUser(control.value.toLowerCase()).pipe(
            map(response => {
              return response.user.length === 0 ? null : { emailTaken: true };
            })
          )
        )
      );
    };
  }
}