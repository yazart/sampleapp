// Automatically generated - do not modify!

import type { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AccountModel } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountsApiService {
  public serviceName: string;
  public uri: string;
  constructor(public http: HttpClient) {
    this.serviceName = 'AccountsApi';
    this.uri = '';
  }

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
}
