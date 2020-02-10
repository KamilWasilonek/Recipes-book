import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { tap, timeout, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor(private spinnerService: SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    const jwt = localStorage.getItem('userToken');
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }

    const timeoutValue = 5000;

    return next.handle(req).pipe(
      delay(500),
      timeout(timeoutValue),
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        },
        error => {
          this.spinnerService.hide();
        }
      )
    );
  }
}
