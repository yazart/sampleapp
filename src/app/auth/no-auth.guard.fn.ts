import {AuthService} from "./auth.service";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {first, map, tap} from "rxjs";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized$.pipe(
    first(),
    map((isAuth)=>{
      return isAuth? router.createUrlTree(['/', 'welcome']): true
    })
  )
};
