/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCinema } from '../fn/cinema-controller/add-cinema';
import { AddCinema$Params } from '../fn/cinema-controller/add-cinema';
import { Adresse } from '../models/adresse';
import { Cinema } from '../models/cinema';
import { deleteCinema } from '../fn/cinema-controller/delete-cinema';
import { DeleteCinema$Params } from '../fn/cinema-controller/delete-cinema';
import { getAllCinemas } from '../fn/cinema-controller/get-all-cinemas';
import { GetAllCinemas$Params } from '../fn/cinema-controller/get-all-cinemas';
import { getCinemaAddressById } from '../fn/cinema-controller/get-cinema-address-by-id';
import { GetCinemaAddressById$Params } from '../fn/cinema-controller/get-cinema-address-by-id';
import { getCinemaById } from '../fn/cinema-controller/get-cinema-by-id';
import { GetCinemaById$Params } from '../fn/cinema-controller/get-cinema-by-id';
import { getCinemaBySeance } from '../fn/cinema-controller/get-cinema-by-seance';
import { GetCinemaBySeance$Params } from '../fn/cinema-controller/get-cinema-by-seance';
import { getSalleDeCinemaByCinemaId } from '../fn/cinema-controller/get-salle-de-cinema-by-cinema-id';
import { GetSalleDeCinemaByCinemaId$Params } from '../fn/cinema-controller/get-salle-de-cinema-by-cinema-id';
import { SalleDeCinema } from '../models/salle-de-cinema';
import { updateCinema } from '../fn/cinema-controller/update-cinema';
import { UpdateCinema$Params } from '../fn/cinema-controller/update-cinema';

@Injectable({ providedIn: 'root' })
export class CinemaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCinema()` */
  static readonly UpdateCinemaPath = '/cinemas/modifier/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCinema()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCinema$Response(params: UpdateCinema$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
    return updateCinema(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCinema$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCinema(params: UpdateCinema$Params, context?: HttpContext): Observable<Cinema> {
    return this.updateCinema$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cinema>): Cinema => r.body)
    );
  }

  /** Path part for operation `addCinema()` */
  static readonly AddCinemaPath = '/cinemas/ajouter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCinema()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCinema$Response(params: AddCinema$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addCinema(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCinema$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addCinema(params: AddCinema$Params, context?: HttpContext): Observable<string> {
    return this.addCinema$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getCinemaById()` */
  static readonly GetCinemaByIdPath = '/cinemas/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCinemaById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaById$Response(params: GetCinemaById$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
    return getCinemaById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCinemaById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaById(params: GetCinemaById$Params, context?: HttpContext): Observable<Cinema> {
    return this.getCinemaById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cinema>): Cinema => r.body)
    );
  }

  /** Path part for operation `getAllCinemas()` */
  static readonly GetAllCinemasPath = '/cinemas/tous';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCinemas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCinemas$Response(params?: GetAllCinemas$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cinema>>> {
    return getAllCinemas(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCinemas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCinemas(params?: GetAllCinemas$Params, context?: HttpContext): Observable<Array<Cinema>> {
    return this.getAllCinemas$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Cinema>>): Array<Cinema> => r.body)
    );
  }

  /** Path part for operation `getSalleDeCinemaByCinemaId()` */
  static readonly GetSalleDeCinemaByCinemaIdPath = '/cinemas/salle-de-cinema/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSalleDeCinemaByCinemaId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSalleDeCinemaByCinemaId$Response(params: GetSalleDeCinemaByCinemaId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SalleDeCinema>>> {
    return getSalleDeCinemaByCinemaId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSalleDeCinemaByCinemaId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSalleDeCinemaByCinemaId(params: GetSalleDeCinemaByCinemaId$Params, context?: HttpContext): Observable<Array<SalleDeCinema>> {
    return this.getSalleDeCinemaByCinemaId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SalleDeCinema>>): Array<SalleDeCinema> => r.body)
    );
  }

  /** Path part for operation `getCinemaBySeance()` */
  static readonly GetCinemaBySeancePath = '/cinemas/by-seance/{seanceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCinemaBySeance()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaBySeance$Response(params: GetCinemaBySeance$Params, context?: HttpContext): Observable<StrictHttpResponse<Cinema>> {
    return getCinemaBySeance(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCinemaBySeance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaBySeance(params: GetCinemaBySeance$Params, context?: HttpContext): Observable<Cinema> {
    return this.getCinemaBySeance$Response(params, context).pipe(
      map((r: StrictHttpResponse<Cinema>): Cinema => r.body)
    );
  }

  /** Path part for operation `getCinemaAddressById()` */
  static readonly GetCinemaAddressByIdPath = '/cinemas/adresse/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCinemaAddressById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaAddressById$Response(params: GetCinemaAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<Adresse>> {
    return getCinemaAddressById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCinemaAddressById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCinemaAddressById(params: GetCinemaAddressById$Params, context?: HttpContext): Observable<Adresse> {
    return this.getCinemaAddressById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Adresse>): Adresse => r.body)
    );
  }

  /** Path part for operation `deleteCinema()` */
  static readonly DeleteCinemaPath = '/cinemas/supprimer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCinema()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCinema$Response(params: DeleteCinema$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteCinema(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCinema$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCinema(params: DeleteCinema$Params, context?: HttpContext): Observable<string> {
    return this.deleteCinema$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
