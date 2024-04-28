/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Seance } from '../../models/seance';

export interface GetFilmSeances$Params {
  filmId: number;
}

export function getFilmSeances(http: HttpClient, rootUrl: string, params: GetFilmSeances$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Seance>>> {
  const rb = new RequestBuilder(rootUrl, getFilmSeances.PATH, 'get');
  if (params) {
    rb.path('filmId', params.filmId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Seance>>;
    })
  );
}

getFilmSeances.PATH = '/films/seances/{filmId}';
