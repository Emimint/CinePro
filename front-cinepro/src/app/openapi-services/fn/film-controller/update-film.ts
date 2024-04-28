/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UpdateFilm$Params {
  filmId: number;
  titre: string;
  langue: string;
  soustitre: string;
  doublage: string;
  duree: string;
  videoUrl: string;
  listeActeurs: string;
  listeRealisateurs: string;
  titreOriginal: string;
  categorie: string;
  description: string;
  dateDeSortie: string;
      body?: {
'file'?: Blob;
}
}

export function updateFilm(http: HttpClient, rootUrl: string, params: UpdateFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, updateFilm.PATH, 'put');
  if (params) {
    rb.path('filmId', params.filmId, {});
    rb.query('titre', params.titre, {});
    rb.query('langue', params.langue, {});
    rb.query('soustitre', params.soustitre, {});
    rb.query('doublage', params.doublage, {});
    rb.query('duree', params.duree, {});
    rb.query('videoUrl', params.videoUrl, {});
    rb.query('listeActeurs', params.listeActeurs, {});
    rb.query('listeRealisateurs', params.listeRealisateurs, {});
    rb.query('titreOriginal', params.titreOriginal, {});
    rb.query('categorie', params.categorie, {});
    rb.query('description', params.description, {});
    rb.query('dateDeSortie', params.dateDeSortie, {});
    rb.body(params.body, 'application/json');
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

updateFilm.PATH = '/films/update/{filmId}';
