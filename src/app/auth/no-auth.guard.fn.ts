import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';

import { AuthService } from './auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized$.pipe(
    first(),
    map((isAuth) => (isAuth ? router.createUrlTree(['/', 'welcome']) : true)),
  );
};
