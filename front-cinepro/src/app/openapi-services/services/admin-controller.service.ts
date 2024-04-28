/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { get1 } from '../fn/admin-controller/get-1';
import { Get1$Params } from '../fn/admin-controller/get-1';

@Injectable({ providedIn: 'root' })
export class AdminControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `get1()` */
  static readonly Get1Path = '/api/v1/admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get1()` instead.
   *
   * This method doesn't expect any request body.
   */
  get1$Response(params?: Get1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return get1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `get1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get1(params?: Get1$Params, context?: HttpContext): Observable<string> {
    return this.get1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
