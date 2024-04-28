/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadFilm$Params {
  titre: string;
  langue: string;
  soustitre: string;
  doublage: string;
  titreOriginal: string;
  categorie: string;
  listeActeurs: string;
  listeRealisateurs: string;
  duree: string;
  videoUrl: string;
  description: string;
  dateDeSortie: string;
      body?: {
'file': Blob;
}
}

export function uploadFilm(http: HttpClient, rootUrl: string, params: UploadFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, uploadFilm.PATH, 'post');
  if (params) {
    rb.query('titre', params.titre, {});
    rb.query('langue', params.langue, {});
    rb.query('soustitre', params.soustitre, {});
    rb.query('doublage', params.doublage, {});
    rb.query('titreOriginal', params.titreOriginal, {});
    rb.query('categorie', params.categorie, {});
    rb.query('listeActeurs', params.listeActeurs, {});
    rb.query('listeRealisateurs', params.listeRealisateurs, {});
    rb.query('duree', params.duree, {});
    rb.query('videoUrl', params.videoUrl, {});
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

uploadFilm.PATH = '/films/ajouter';
