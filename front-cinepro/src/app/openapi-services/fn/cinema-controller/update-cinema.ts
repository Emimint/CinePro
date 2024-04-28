/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cinema } from '../../models/cinema';

export interface UpdateCinema$Params {
  id: number;
      body: Cinema
}

export function updateCinema(http: HttpClient, rootUrl: string, params: UpdateCinema$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
  const rb = new RequestBuilder(rootUrl, updateCinema.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateCinema.PATH = '/cinemas/modifier/{id}';
