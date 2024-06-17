import {AuthService} from "./auth.service";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {first, map, tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized$.pipe(
    first(),
    map((isAuth)=>{
      return isAuth? true: router.createUrlTree(['/', 'auth', 'login'])
    })
  )
};
