import { inject, Injectable } from '@angular/core';
import type { TokenModel } from '@api';
import { AuthorizationApiService } from '@api';
import { SESSION_STORAGE } from '@ng-web-apis/common';
import { jwtDecode } from 'jwt-decode';
import { DateTime } from 'luxon';
import {BehaviorSubject, Observable, skipWhile} from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  interval,
  map,
  of,
  ReplaySubject,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';

import type { JWTModel } from '../types/jwt.model';
import { SKIP_HEADER } from './auth-interceptor.fn';
import {Router} from "@angular/router";

export const TOKEN_MODEL = 'tokenModel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthorizationApiService);
  private readonly tokenModel$ = new ReplaySubject<TokenModel | null>(1);

  private readonly storage = inject(SESSION_STORAGE);

  private readonly compareInterval = interval(1000)
    .pipe(
      withLatestFrom(this.tokenModel$),
      map(([_, model]) => {
        if (model?.accessToken) {
          const tokenData = jwtDecode<JWTModel>(model.accessToken);
          const expDate = new Date(0);

          if (!tokenData.exp) {
            this.logout();

            return false;
          }

          expDate.setUTCSeconds(tokenData.exp);

          const dt = DateTime.fromJSDate(expDate);
          const refreshSeconds =
            dt.diff(DateTime.now(), 'seconds').toObject().seconds || 0;

          if (refreshSeconds <= 0) {
            this.logout();

            return false;
          }

          return refreshSeconds > 0 && refreshSeconds < 20;
        }

        return false;
      }),
      filter((val): val is true => !!val),
      exhaustMap(() => this.refresh()),
    )
    .subscribe(() => {});

  public recoveryProcess$ = new BehaviorSubject<boolean>(false);

  public token$ = this.tokenModel$.pipe(
    map((model) => model?.accessToken || null),

  );
  public isAuthorized$ = this.token$.pipe(
    map((token): boolean => !!token),
    withLatestFrom(this.recoveryProcess$),
    map(([isAuthorized, recoveryIsRunning]: [boolean, boolean])=>{
      return recoveryIsRunning? false: isAuthorized;
    })
  );


  public decodedToken$ = this.token$.pipe(
    map((token) => (token ? jwtDecode<JWTModel>(token) : {})),
  );

  public readonly pTokenModel$ = this.tokenModel$.pipe(map((data) => data));

  public logout(): void {
    this.storage.removeItem(TOKEN_MODEL);
    this.tokenModel$.next(null);
  }

  public login(login: string, pass: string): Observable<boolean> {
    return this.api
      .sendApiAuthorizationToken(
        {
          login,
          password: pass,
        },
        undefined,
        { [SKIP_HEADER]: `${SKIP_HEADER}` },
      )
      .pipe(
        map((data): boolean => {
          this.storage.setItem(TOKEN_MODEL, JSON.stringify(data));
          this.tokenModel$.next(data);

          return true;
        }),
        catchError(() => of(false)),
      );
  }

  public async init(): Promise<void> {
    return new Promise((resolve) => {
      const model = this.storage.getItem(TOKEN_MODEL) || 'null';

      this.tokenModel$.next(JSON.parse(model));
      resolve();
    });
  }

  protected refresh(): Observable<boolean> {
    return this.tokenModel$.pipe(
      filter((x): x is TokenModel => !!x),
      take(1),
      switchMap((tokenModel) =>
        this.api.sendApiAuthorizationRefresh(tokenModel, undefined, {
          [SKIP_HEADER]: `${SKIP_HEADER}`,
        }),
      ),
      map((data) => {
        this.storage.setItem(TOKEN_MODEL, JSON.stringify(data));
        this.tokenModel$.next(data);

        return true;
      }),
      catchError(() => of(false)),
    );
  }
}
