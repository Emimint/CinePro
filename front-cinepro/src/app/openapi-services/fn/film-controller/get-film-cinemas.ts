/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cinema } from '../../models/cinema';

export interface GetFilmCinemas$Params {
  filmId: number;
}

export function getFilmCinemas(http: HttpClient, rootUrl: string, params: GetFilmCinemas$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cinema>>> {
  const rb = new RequestBuilder(rootUrl, getFilmCinemas.PATH, 'get');
  if (params) {
    rb.path('filmId', params.filmId, {});
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

getFilmCinemas.PATH = '/films/cinemas/{filmId}';
