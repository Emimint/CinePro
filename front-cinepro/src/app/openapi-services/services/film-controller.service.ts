/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Cinema } from '../models/cinema';
import { deleteFilm } from '../fn/film-controller/delete-film';
import { DeleteFilm$Params } from '../fn/film-controller/delete-film';
import { Film } from '../models/film';
import { getAllFilms } from '../fn/film-controller/get-all-films';
import { GetAllFilms$Params } from '../fn/film-controller/get-all-films';
import { getFilm } from '../fn/film-controller/get-film';
import { GetFilm$Params } from '../fn/film-controller/get-film';
import { getFilmCinemas } from '../fn/film-controller/get-film-cinemas';
import { GetFilmCinemas$Params } from '../fn/film-controller/get-film-cinemas';
import { getFilmImage } from '../fn/film-controller/get-film-image';
import { GetFilmImage$Params } from '../fn/film-controller/get-film-image';
import { getFilmSeances } from '../fn/film-controller/get-film-seances';
import { GetFilmSeances$Params } from '../fn/film-controller/get-film-seances';
import { Image } from '../models/image';
import { Seance } from '../models/seance';
import { updateFilm } from '../fn/film-controller/update-film';
import { UpdateFilm$Params } from '../fn/film-controller/update-film';
import { uploadFilm } from '../fn/film-controller/upload-film';
import { UploadFilm$Params } from '../fn/film-controller/upload-film';

@Injectable({ providedIn: 'root' })
export class FilmControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateFilm()` */
  static readonly UpdateFilmPath = '/films/update/{filmId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFilm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFilm$Response(params: UpdateFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateFilm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateFilm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateFilm(params: UpdateFilm$Params, context?: HttpContext): Observable<string> {
    return this.updateFilm$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `uploadFilm()` */
  static readonly UploadFilmPath = '/films/ajouter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadFilm$Response(params: UploadFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return uploadFilm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFilm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadFilm(params: UploadFilm$Params, context?: HttpContext): Observable<string> {
    return this.uploadFilm$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAllFilms()` */
  static readonly GetAllFilmsPath = '/films/tous';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFilms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFilms$Response(params?: GetAllFilms$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Film>>> {
    return getAllFilms(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFilms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFilms(params?: GetAllFilms$Params, context?: HttpContext): Observable<Array<Film>> {
    return this.getAllFilms$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Film>>): Array<Film> => r.body)
    );
  }

  /** Path part for operation `getFilmSeances()` */
  static readonly GetFilmSeancesPath = '/films/seances/{filmId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilmSeances()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmSeances$Response(params: GetFilmSeances$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Seance>>> {
    return getFilmSeances(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilmSeances$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmSeances(params: GetFilmSeances$Params, context?: HttpContext): Observable<Array<Seance>> {
    return this.getFilmSeances$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Seance>>): Array<Seance> => r.body)
    );
  }

  /** Path part for operation `getFilmImage()` */
  static readonly GetFilmImagePath = '/films/image/{filmId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilmImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmImage$Response(params: GetFilmImage$Params, context?: HttpContext): Observable<StrictHttpResponse<Image>> {
    return getFilmImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilmImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmImage(params: GetFilmImage$Params, context?: HttpContext): Observable<Image> {
    return this.getFilmImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<Image>): Image => r.body)
    );
  }

  /** Path part for operation `getFilm()` */
  static readonly GetFilmPath = '/films/film/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilm$Response(params: GetFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<Film>> {
    return getFilm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilm(params: GetFilm$Params, context?: HttpContext): Observable<Film> {
    return this.getFilm$Response(params, context).pipe(
      map((r: StrictHttpResponse<Film>): Film => r.body)
    );
  }

  /** Path part for operation `getFilmCinemas()` */
  static readonly GetFilmCinemasPath = '/films/cinemas/{filmId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFilmCinemas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmCinemas$Response(params: GetFilmCinemas$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cinema>>> {
    return getFilmCinemas(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFilmCinemas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFilmCinemas(params: GetFilmCinemas$Params, context?: HttpContext): Observable<Array<Cinema>> {
    return this.getFilmCinemas$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Cinema>>): Array<Cinema> => r.body)
    );
  }

  /** Path part for operation `deleteFilm()` */
  static readonly DeleteFilmPath = '/films/delete/{filmId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFilm()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFilm$Response(params: DeleteFilm$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteFilm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFilm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFilm(params: DeleteFilm$Params, context?: HttpContext): Observable<string> {
    return this.deleteFilm$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
