/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Adresse } from '../../models/adresse';

export interface GetCinemaAddressById$Params {
  id: number;
}

export function getCinemaAddressById(http: HttpClient, rootUrl: string, params: GetCinemaAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<Adresse>> {
  const rb = new RequestBuilder(rootUrl, getCinemaAddressById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Adresse>;
    })
  );
}

getCinemaAddressById.PATH = '/cinemas/adresse/{id}';
