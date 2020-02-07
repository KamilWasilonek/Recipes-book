import { debounceTime, map, take, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AbstractControl } from '@angular/forms';

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