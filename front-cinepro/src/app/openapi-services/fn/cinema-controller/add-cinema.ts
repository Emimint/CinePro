/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddCinema$Params {
  nomCinema: string;
  ville: string;
  codePostal: string;
  nomRue: string;
  pays: string;
  numeroCivique: string;
  latitude: number;
  longitude: number;
}

export function addCinema(http: HttpClient, rootUrl: string, params: AddCinema$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, addCinema.PATH, 'post');
  if (params) {
    rb.query('nomCinema', params.nomCinema, {});
    rb.query('ville', params.ville, {});
    rb.query('codePostal', params.codePostal, {});
    rb.query('nomRue', params.nomRue, {});
    rb.query('pays', params.pays, {});
    rb.query('numeroCivique', params.numeroCivique, {});
    rb.query('latitude', params.latitude, {});
    rb.query('longitude', params.longitude, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

addCinema.PATH = '/cinemas/ajouter';
