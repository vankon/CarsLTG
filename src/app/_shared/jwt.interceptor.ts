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

    return next.handle(this.addTokenToRequest(request, 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX25hbWUiOiJzYW1pLmxhc3NlZDEiLCJ1c2VyX2ZpcnN0X25hbWUiOiJGaXJzdCIsInVzZXJfbGFzdF9uYW1lIjoiQWNjb3VudCIsInVzZXJfc3RhdHVzIjoiaW5fcmV2aWV3IiwidXNlcl90eXBlIjoidXNlciIsImNyZWF0ZWRfb24iOjE2NDMzMTYyOTk1NDIsImxhc3RfdXBkYXRlZF9vbiI6MTY0MzMzMTIzOTYwMywidXNlcl9wbGFucyI6W10sImNvbnRhY3QiOlt7ImlkIjo3LCJlbnRpdHlfdHlwZSI6InVzZXIiLCJlbnRpdHlfaWQiOjcsImFkZHJlc3MiOlt7ImlkIjoxMiwic3RyZWV0IjoiMTIzIEhhcHBpbmVzcyBTdHJlZXQiLCJzdHJlZXQyIjoiIiwic3RyZWV0MSI6IiIsImNpdHlfaWQiOjMxMjQ2LCJjaXR5IjpudWxsLCJzdGF0ZV9pZCI6MTA5OCwic3RhdGUiOm51bGwsImNvdW50cnlfaWQiOjQsImNvdW50cnkiOm51bGwsInppcF9jb2RlIjoiMzEwMDAiLCJsYXQiOiIiLCJsbmciOiIifV0sImVtYWlsIjpbeyJpZCI6NywiZW1haWxfaWQiOiJzYW1pLmxhc3NlZDFAZ21haWwuY29tIn1dLCJwaG9uZSI6W3siaWQiOjksImNvdW50cnlfY29kZSI6IisyMTMiLCJhcmVhX2NvZGUiOm51bGwsIm51bWJlciI6IjUxNDkxOTExMjcifV19XSwibWVkaWEiOm51bGwsInVzZXJfcm9sZXMiOlt7ImlkIjozLCJuYW1lIjoiUk9MRV9VU0VSIiwicm9sZV9wZXJtaXNzaW9uIjpbeyJpZCI6MywibmFtZSI6IkJBU0lDIn1dfV0sImRhdGVfb2ZfYmlydGgiOiIyNy0xMC0xOTgzIiwiZ2VuZGVyIjoiTWFsZSIsImFnZSI6MzgsInVzZXJSb2xlIjoiUk9MRV9VU0VSIiwiaXNzIjoidXNlci1hY2NvdW50Iiwic3ViIjoic2FtaS5sYXNzZWQxIiwiaWF0IjoxNjQzMzg2MzEzLCJleHAiOjE2NDUxODYzMTN9.Z5dobtS6L0oXmJ7KQEjbjklQqug15LDMaRoXZfE-5UxOvHJGWody1tQDYshSzbi0iETijVKv6bKqXH-6k8y1Qg'))
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
