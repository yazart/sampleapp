import type {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs';

import { AuthService } from './auth.service';

export const SKIP_HEADER = 'x-skip-interceptor-token';

export function authInterceptorFn(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  const skip = req.headers.get(SKIP_HEADER);

  if (!skip) {
    return authService.token$.pipe(
      take(1),
      switchMap((token) => {
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        });

        return next(authReq);
      }),
    );
  }

  const skipAuthReq = req.clone({
    headers: req.headers.delete(SKIP_HEADER),
  });

  return next(skipAuthReq);
}
