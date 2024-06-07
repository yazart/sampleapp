import {inject, Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHandlerFn, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {filter, Observable, startWith, switchMap, take, tap} from "rxjs";
import {AuthService} from "./auth.service";

export const SKIP_HEADER = 'x-skip-interceptor-token';

export function authInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  const skip = req.headers.get(SKIP_HEADER);
  console.log(skip);
    if(!skip){
      console.log(req.url);

      return authService.token$.pipe(
        take(1),
        switchMap((token)=> {
          console.log(token);

          const authReq = req.clone({
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          })
          return next(authReq);
        })
      )
    }
    const skipAuthReq = req.clone({
      headers: req.headers.delete(SKIP_HEADER)
    })

    return next(skipAuthReq);
}
