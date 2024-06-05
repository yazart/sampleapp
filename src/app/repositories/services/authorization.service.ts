// Automatically generated - do not modify!

import type { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { GetTokenModel, TokenModel } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthorizationApiService {
  public serviceName: string;
  public uri: string;
  constructor(public http: HttpClient) {
    this.serviceName = 'AuthorizationApi';
    this.uri = '/';
  }

  /**
   * @method
   * @name  sendApiAuthorizationToken
   * @description Возвращает токен авторизации
   * @param {GetTokenModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public sendApiAuthorizationToken(
    methodBody: GetTokenModel,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<TokenModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    let payload = {};

    payload = methodBody;

    return this.http.post<TokenModel>(
      `${this.uri}/api/authorization/token`,
      JSON.stringify(payload),
      options,
    );
  }

  /**
   * @method
   * @name  sendApiAuthorizationRefresh
   * @description Обновляет токен
   * @param {TokenModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public sendApiAuthorizationRefresh(
    methodBody: TokenModel,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<TokenModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    let payload = {};

    payload = methodBody;

    return this.http.post<TokenModel>(
      `${this.uri}/api/authorization/refresh`,
      JSON.stringify(payload),
      options,
    );
  }

  /**
   * @method
   * @name  deleteApiAuthorizationLogout
   * @description Выполняет выход из системы
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public deleteApiAuthorizationLogout(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<Record<string, unknown> | unknown> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.delete<Record<string, unknown> | unknown>(
      `${this.uri}/api/authorization/logout`,
      options,
    );
  }
}
