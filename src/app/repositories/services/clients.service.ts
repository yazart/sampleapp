// Automatically generated - do not modify!

import type { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { ClientModel, CreateClientModel } from '../models';

@Injectable({ providedIn: 'root' })
export class ClientsApiService {
  public serviceName: string;
  public uri: string;
  constructor(public http: HttpClient) {
    this.serviceName = 'ClientsApi';
    this.uri = '/';
  }

  /**
   * @method
   * @name  getApiClients
   * @description Возвращает клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiClients(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<ClientModel> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<ClientModel>(`${this.uri}/api/clients`, options);
  }

  /**
   * @method
   * @name  updateApiClients
   * @description Создает клиента
   * @param {CreateClientModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiClients(
    methodBody: CreateClientModel,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<Record<string, unknown> | unknown> {
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

    return this.http.put<Record<string, unknown> | unknown>(
      `${this.uri}/api/clients`,
      JSON.stringify(payload),
      options,
    );
  }

  /**
   * @method
   * @name  deleteApiClients
   * @description Удаляет клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public deleteApiClients(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<Record<string, unknown> | unknown> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.delete<Record<string, unknown> | unknown>(
      `${this.uri}/api/clients`,
      options,
    );
  }
}
