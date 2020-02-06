import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  constructor(private spinnerService: SpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    this.spinnerService.loadingStatus$.subscribe(res => {
      console.log(res);
    });
    const jwt = localStorage.getItem('userToken');
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
    return next.handle(req).pipe(
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
