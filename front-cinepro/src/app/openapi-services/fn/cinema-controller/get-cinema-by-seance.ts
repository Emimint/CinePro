/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cinema } from '../../models/cinema';

export interface GetCinemaBySeance$Params {
  seanceId: number;
}

export function getCinemaBySeance(http: HttpClient, rootUrl: string, params: GetCinemaBySeance$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
  const rb = new RequestBuilder(rootUrl, getCinemaBySeance.PATH, 'get');
  if (params) {
    rb.path('seanceId', params.seanceId, {});
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

getCinemaBySeance.PATH = '/cinemas/by-seance/{seanceId}';
