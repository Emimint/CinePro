import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cinema } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  private apiServerUrl = environment.apiUrl + 'cinemas';

  constructor(private httpClient: HttpClient) {}

  public getAllCinemas(): Observable<Cinema[]> {
    return this.httpClient.get<Cinema[]>(`${this.apiServerUrl}/tous`);
  }

  public getCinemaById(cinemaId: number): Observable<Cinema> {
    return this.httpClient.get<Cinema>(`${this.apiServerUrl}/${cinemaId}`);
  }

  public getCinemaAddressById(cinemaId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiServerUrl}/adresse/${cinemaId}`);
  }

  public addCinema(
    nomCinema: string,
    ville: string,
    codePostal: string,
    nomRue: string,
    pays: string,
    numeroCivique: string
  ): Observable<string> {
    const params = {
      nomCinema: nomCinema,
      ville: ville,
      codePostal: codePostal,
      nomRue: nomRue,
      pays: pays,
      numeroCivique: numeroCivique,
    };
    return this.httpClient.post<string>(`${this.apiServerUrl}/ajouter`, params);
  }

  public updateCinema(cinemaId: number, cinema: Cinema): Observable<Cinema> {
    return this.httpClient.put<Cinema>(
      `${this.apiServerUrl}/modifier/${cinemaId}`,
      cinema
    );
  }

  public deleteCinema(cinemaId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiServerUrl}/supprimer/${cinemaId}`
    );
  }
}
