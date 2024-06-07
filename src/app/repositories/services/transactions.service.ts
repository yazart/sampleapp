// Automatically generated - do not modify!

import { TransactionModel } from '../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn:'root'}  )
export class TransactionsApiService {
  public serviceName: string;
  public uri: string;
  constructor(
    public http: HttpClient) {
    this.serviceName = 'TransactionsApi';
    this.uri = '';
  }

  
	/**
	* @method
	* @name  getApiTransactions
	* @description Возвращает список транзакций клиента по всем счетам
	* @param {Record<string, string>} customOptions
	* @param {Record<string, string>} customHeaders
	*/
	public getApiTransactions(customOptions: Record<string, string> = { }, customHeaders: Record<string, string> = { }  ): Observable<TransactionModel[]> {
      const options = {
        headers: new HttpHeaders( customHeaders ),
        params: new HttpParams(),
        ...customOptions
      };
      return this.http.get<TransactionModel[]>(this.uri + `/api/transactions`, options);
    }
    
	/**
	* @method
	* @name  getApiTransactionsByAccountAccountId
	* @description Возвращает список транзакций по счёту
	* @param {number} accountId
	* @param {Record<string, string>} customOptions
	* @param {Record<string, string>} customHeaders
	*/
	public getApiTransactionsByAccountAccountId(accountId: number, customOptions: Record<string, string> = { }, customHeaders: Record<string, string> = { }  ): Observable<TransactionModel[]> {
      const options = {
        headers: new HttpHeaders( customHeaders ),
        params: new HttpParams(),
        ...customOptions
      };
      return this.http.get<TransactionModel[]>(this.uri + `/api/transactions/byAccount/${accountId}`, options);
    }
    
	/**
	* @method
	* @name  getApiTransactionsInfoTransactionId
	* @description Возвращает информацию о транзакции
	* @param {number} transactionId
	* @param {Record<string, string>} customOptions
	* @param {Record<string, string>} customHeaders
	*/
	public getApiTransactionsInfoTransactionId(transactionId: number, customOptions: Record<string, string> = { }, customHeaders: Record<string, string> = { }  ): Observable<TransactionModel> {
      const options = {
        headers: new HttpHeaders( customHeaders ),
        params: new HttpParams(),
        ...customOptions
      };
      return this.http.get<TransactionModel>(this.uri + `/api/transactions/info/${transactionId}`, options);
    }
  }
