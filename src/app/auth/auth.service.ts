import {Inject, Injectable} from "@angular/core";
import {AuthorizationApiService, TokenModel} from "@api";
import {
  catchError, exhaustMap,
  filter, interval,
  map,
  Observable,
  of, ReplaySubject,
  switchMap,
  take,
  tap, withLatestFrom
} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {SESSION_STORAGE} from "@ng-web-apis/common";
import {JWTModel} from "../types/jwt.model";
import {DateTime} from "luxon";
import {SKIP_HEADER} from "./auth-interceptor.fn";

export const TOKEN_MODEL = 'tokenModel'

@Injectable({providedIn: "root"})
export class AuthService {
  _tokenModel$ = new ReplaySubject<TokenModel | null>(1);
  tokenModel$ = this._tokenModel$.pipe(
    map((data)=>{
      console.log('emit');
      if(data?.accessToken){
        console.log(jwtDecode(data.accessToken))
      }
      return data;
    }),
  )
  _compareInterval = interval(1000).pipe(
    withLatestFrom(this.tokenModel$),
    map(([_, model])=>{
      if(model?.accessToken){
        const tokenData = jwtDecode<JWTModel>(model.accessToken)
        const expDate = new Date(0);
        if(!tokenData.exp){
          this.logout();
          return false
        }

        expDate.setUTCSeconds(tokenData.exp);

        const dt = DateTime.fromJSDate(
          expDate
        )
        const refreshSeconds = dt.diff(DateTime.now(), 'seconds').toObject()['seconds'] || 0;
        console.log(refreshSeconds);
        if(refreshSeconds <= 0) {
          this.logout();
          return false
        }

        return refreshSeconds > 0 && refreshSeconds < 20;
      }
      return false;
    }),
    filter((val): val is true=>!!val),
    exhaustMap(()=>this.refresh())
  ).subscribe(()=> {})

  token$ = this.tokenModel$.pipe(
    map((model)=>model?.accessToken || null),
  )

  decodedToken$ = this.token$.pipe(
    map((token)=> token ? jwtDecode<JWTModel>(token): {} as JWTModel)
  )
  constructor(
    @Inject(SESSION_STORAGE) private readonly storage: Storage,
    private readonly api: AuthorizationApiService) {
  }

  init(): Promise<void>{
    return  new Promise((resolve, reject)=>{
      const model = this.storage.getItem(TOKEN_MODEL) || "null";
      this._tokenModel$.next(JSON.parse(model));
      resolve();
    })
  }

  logout(): void {
    this.storage.removeItem(TOKEN_MODEL);
    this._tokenModel$.next(null);
  }

  login(login: string, pass: string){
    return this.api.sendApiAuthorizationToken({
      login: login,
      password: pass
    }, undefined, {[SKIP_HEADER]: `${SKIP_HEADER}`}).pipe(
      map((data):boolean=>{
        this.storage.setItem(TOKEN_MODEL, JSON.stringify(data));
        this._tokenModel$.next(data);
        return true;
      }),
      catchError(()=> of(false)),
    )
  }
  refresh():Observable<boolean>{
    return this.tokenModel$.pipe(
      filter((x): x is TokenModel=>!!x),
      take(1),
      switchMap(tokenModel => this.api.sendApiAuthorizationRefresh(tokenModel, undefined, {[SKIP_HEADER]: `${SKIP_HEADER}`})),
      map((data)=> {
        this.storage.setItem(TOKEN_MODEL, JSON.stringify(data));
        this._tokenModel$.next(data);
        return true;
      }),
      catchError((e)=> of(false)),
    )
  }
}
