// Automatically generated - do not modify!

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AccountModel, AccountUpdateModel } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  public serviceName = 'AccountsApi';
  public uri = '';
  public http = inject(HttpClient);

  /**
   * @method
   * @name  getApiAccounts
   * @description Возвращает счета клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiAccounts(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<AccountModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<AccountModel[]>(`${this.uri}/api/accounts`, options);
  }

  /**
   * @method
   * @name  updateApiAccounts
   * @description Обновляет информацию о счёте
   * @param {AccountUpdateModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiAccounts(
    methodBody: AccountUpdateModel,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<AccountModel> {
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

    return this.http.patch<AccountModel>(
      `${this.uri}/api/accounts`,
      /* `patch` */ payload,
      options,
    );
  }

  /**
   * @method
   * @name  getApiAccountsAccountId
   * @description Возвращает счёт клиента по ID
   * @param {number} accountId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiAccountsAccountId(
    accountId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<AccountModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<AccountModel[]>(
      `${this.uri}/api/accounts/${accountId}`,
      options,
    );
  }

  /**
   * @method
   * @name  updateApiAccountsLockAccountId
   * @description Блокирует счёт
   * @param {number} accountId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiAccountsLockAccountId(
    accountId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<AccountModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    const payload = {};

    return this.http.patch<AccountModel>(
      `${this.uri}/api/accounts/lock/${accountId}`,
      /* `patch` */ payload,
      options,
    );
  }

  /**
   * @method
   * @name  updateApiAccountsUnlockAccountId
   * @description Разблокирует счёт
   * @param {number} accountId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiAccountsUnlockAccountId(
    accountId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<AccountModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    const payload = {};

    return this.http.patch<AccountModel>(
      `${this.uri}/api/accounts/unlock/${accountId}`,
      /* `patch` */ payload,
      options,
    );
  }
}
