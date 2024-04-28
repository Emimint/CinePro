/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cinema } from '../../models/cinema';

export interface GetCinemaById$Params {
  id: number;
}

export function getCinemaById(http: HttpClient, rootUrl: string, params: GetCinemaById$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
  const rb = new RequestBuilder(rootUrl, getCinemaById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Cinema>;
    })
  );
}

getCinemaById.PATH = '/cinemas/{id}';
