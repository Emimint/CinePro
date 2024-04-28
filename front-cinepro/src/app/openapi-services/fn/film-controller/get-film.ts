/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Film } from '../../models/film';

export interface GetFilm$Params {
  id: number;
}

export function getFilm(http: HttpClient, rootUrl: string, params: GetFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<Film>> {
  const rb = new RequestBuilder(rootUrl, getFilm.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Film>;
    })
  );
}

getFilm.PATH = '/films/film/{id}';
