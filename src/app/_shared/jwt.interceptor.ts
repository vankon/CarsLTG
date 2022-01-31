import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    public route: ActivatedRoute,
    public router: Router) { }

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent
      | HttpHeaderResponse
      | HttpProgressEvent
      | HttpResponse<any>
      | HttpUserEvent<any>
      | any> {

    return next.handle(this.addTokenToRequest(request, ''))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => error);
        })
      )
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
