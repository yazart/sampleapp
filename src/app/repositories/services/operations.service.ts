// Automatically generated - do not modify!

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { createParamString } from '../internals';
import type {
  OperationInfo,
  PostedParam,
  StartOperationModel,
} from '../models';

@Injectable({ providedIn: 'root' })
export class OperationsApiService {
  public serviceName = 'OperationsApi';
  public uri = '';
  public http = inject(HttpClient);

  /**
   * @method
   * @name  getApiOperations
   * @description Возвращает список операций клиента
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public getApiOperations(
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<OperationInfo[]> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };

    return this.http.get<OperationInfo[]>(
      `${this.uri}/api/operations`,
      options,
    );
  }

  /**
   * @method
   * @name  sendApiOperations
   * @description Подтверждает операцию
   * @param {number} requestId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public sendApiOperations(
    requestId?: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<OperationInfo> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };
    const paramString = createParamString(['requestId', requestId]);

    options.params = new HttpParams({ fromString: paramString });
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    const payload = {};

    return this.http.post<OperationInfo>(
      `${this.uri}/api/operations`,
      /* `post` */ JSON.stringify(payload),
      options,
    );
  }

  /**
   * @method
   * @name  updateApiOperations
   * @description Запускает новую операцию
   * @param {StartOperationModel} methodBody
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiOperations(
    methodBody: StartOperationModel,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<OperationInfo> {
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

    return this.http.put<OperationInfo>(
      `${this.uri}/api/operations`,
      /* `put` */ JSON.stringify(payload),
      options,
    );
  }

  /**
   * @method
   * @name  updateApiOperations1
   * @description Выполняет следующий шаг операции
   * @param {PostedParam[]} methodBody
   * @param {number} requestId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public updateApiOperations1(
    methodBody: PostedParam[],
    requestId?: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<OperationInfo> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };
    const paramString = createParamString(['requestId', requestId]);

    options.params = new HttpParams({ fromString: paramString });
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...customHeaders,
    });
    let payload = {};

    payload = methodBody;

    return this.http.patch<OperationInfo>(
      `${this.uri}/api/operations`,
      /* `patch` */ payload,
      options,
    );
  }

  /**
   * @method
   * @name  deleteApiOperations
   * @description Удаляет операцию
   * @param {number} requestId
   * @param {Record<string, string>} customOptions
   * @param {Record<string, string>} customHeaders
   */
  public deleteApiOperations(
    requestId?: number,
    customOptions: Record<string, string> = {},
    customHeaders: Record<string, string> = {},
  ): Observable<Record<string, unknown> | unknown> {
    const options = {
      headers: new HttpHeaders(customHeaders),
      params: new HttpParams(),
      ...customOptions,
    };
    const paramString = createParamString(['requestId', requestId]);

    options.params = new HttpParams({ fromString: paramString });

    return this.http.delete<Record<string, unknown> | unknown>(
      `${this.uri}/api/operations`,
      options,
    );
  }
}
