// Automatically generated - do not modify!

import { ProductModel, ProductExtendedModel } from '../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn:'root'}  )
export class ShowcaseApiService {
  public serviceName: string;
  public uri: string;
  constructor(
    public http: HttpClient) {
    this.serviceName = 'ShowcaseApi';
    this.uri = '';
  }

  
	/**
	* @method
	* @name  getApiShowcaseProducts
	* @description Возвращает доступные продукты
	* @param {Record<string, string>} customOptions
	* @param {Record<string, string>} customHeaders
	*/
	public getApiShowcaseProducts(customOptions: Record<string, string> = { }, customHeaders: Record<string, string> = { }  ): Observable<ProductModel[]> {
      const options = {
        headers: new HttpHeaders( customHeaders ),
        params: new HttpParams(),
        ...customOptions
      };
      return this.http.get<ProductModel[]>(this.uri + `/api/showcase/products`, options);
    }
    
	/**
	* @method
	* @name  getApiShowcaseProductProductId
	* @description Возвращает информацию о продукте
	* @param {number} productId
	* @param {Record<string, string>} customOptions
	* @param {Record<string, string>} customHeaders
	*/
	public getApiShowcaseProductProductId(productId: number, customOptions: Record<string, string> = { }, customHeaders: Record<string, string> = { }  ): Observable<ProductExtendedModel> {
      const options = {
        headers: new HttpHeaders( customHeaders ),
        params: new HttpParams(),
        ...customOptions
      };
      return this.http.get<ProductExtendedModel>(this.uri + `/api/showcase/product/${productId}`, options);
    }
  }
