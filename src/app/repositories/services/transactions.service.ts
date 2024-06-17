// Automatically generated - do not modify!

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { TransactionModel } from '../models';

@Injectable({ providedIn: 'root' })
export class TransactionsApiService {
  public serviceName = 'TransactionsApi';
  public uri = '';
  public http = inject(HttpClient);

  /**
   * @method
   * @name  getApiTransactions
   * @description Возвращает список транзакций клиента по всем счетам
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiTransactions(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<TransactionModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<TransactionModel[]>(
      `${this.uri}/api/transactions`,
      options,
    );
  }

  /**
   * @method
   * @name  getApiTransactionsByAccountAccountId
   * @description Возвращает список транзакций по счёту
   * @param {number} accountId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiTransactionsByAccountAccountId(
    accountId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<TransactionModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<TransactionModel[]>(
      `${this.uri}/api/transactions/byAccount/${accountId}`,
      options,
    );
  }

  /**
   * @method
   * @name  getApiTransactionsInfoTransactionId
   * @description Возвращает информацию о транзакции
   * @param {number} transactionId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiTransactionsInfoTransactionId(
    transactionId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<TransactionModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<TransactionModel>(
      `${this.uri}/api/transactions/info/${transactionId}`,
      options,
    );
  }
}
