/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cinema } from '../../models/cinema';

export interface GetAllCinemas$Params {
}

export function getAllCinemas(http: HttpClient, rootUrl: string, params?: GetAllCinemas$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cinema>>> {
  const rb = new RequestBuilder(rootUrl, getAllCinemas.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Cinema>>;
    })
  );
}

getAllCinemas.PATH = '/cinemas/tous';
