// Automatically generated - do not modify!

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type {
  AccountModel,
  CardActivateModel,
  CardModel,
  CardOrderModel,
} from '../models';

@Injectable({ providedIn: 'root' })
export class CardsApiService {
  public serviceName = 'CardsApi';
  public uri = '';
  public http = inject(HttpClient);

  /**
   * @method
   * @name  getApiCards
   * @description Возвращает карты клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiCards(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<CardModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<CardModel[]>(`${this.uri}/api/cards`, options);
  }

  /**
   * @method
   * @name  getApiCardsCardIdCvc
   * @description Возвращает CVC карты
   * @param {number} cardId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiCardsCardIdCvc(
    cardId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<number> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<number>(
      `${this.uri}/api/cards/${cardId}/cvc`,
      options,
    );
  }

  /**
   * @method
   * @name  getApiCardsOrders
   * @description Возвращает заказы карт клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiCardsOrders(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<CardOrderModel[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<CardOrderModel[]>(
      `${this.uri}/api/cards/orders`,
      options,
    );
  }

  /**
   * @method
   * @name  updateApiCardsActivateCardId
   * @description Активирует карту
   * @param {number} cardId
   * @param {CardActivateModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiCardsActivateCardId(
    cardId: number,
    methodBody: CardActivateModel,
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
      `${this.uri}/api/cards/activate/${cardId}`,
      /* `patch` */ payload,
      options,
    );
  }

  /**
   * @method
   * @name  updateApiCardsLockCardId
   * @description Блокирует карту
   * @param {number} cardId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiCardsLockCardId(
    cardId: number,
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
      `${this.uri}/api/cards/lock/${cardId}`,
      /* `patch` */ payload,
      options,
    );
  }

  /**
   * @method
   * @name  updateApiCardsUnlockCardId
   * @description Разблокирует карту
   * @param {number} cardId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiCardsUnlockCardId(
    cardId: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<CardModel> {
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

    return this.http.patch<CardModel>(
      `${this.uri}/api/cards/unlock/${cardId}`,
      /* `patch` */ payload,
      options,
    );
  }
}
