/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SalleDeCinema } from '../../models/salle-de-cinema';

export interface GetSalleDeCinemaByCinemaId$Params {
  id: number;
}

export function getSalleDeCinemaByCinemaId(http: HttpClient, rootUrl: string, params: GetSalleDeCinemaByCinemaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SalleDeCinema>>> {
  const rb = new RequestBuilder(rootUrl, getSalleDeCinemaByCinemaId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SalleDeCinema>>;
    })
  );
}

getSalleDeCinemaByCinemaId.PATH = '/cinemas/salle-de-cinema/{id}';
