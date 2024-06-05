// Automatically generated - do not modify!

import type { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { CardModel, CardOrderModel } from '../models';

@Injectable({ providedIn: 'root' })
export class CardsApiService {
  public serviceName: string;
  public uri: string;
  constructor(public http: HttpClient) {
    this.serviceName = 'CardsApi';
    this.uri = '/';
  }

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
}
