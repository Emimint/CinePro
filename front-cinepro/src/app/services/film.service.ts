import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Film } from '../models/film';
import { Image } from '../models/image';
import { Seance } from '../models/seance';
import { Cinema } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiServerUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.apiServerUrl + 'films/tous');
  }

  public getFilm(filmId: number): Observable<Film> {
    return this.httpClient.get<Film>(
      this.apiServerUrl + `films/film/${filmId}`
    );
  }

  public getFilmSeances(filmId: number): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>(
      `${this.apiServerUrl}films/seances/${filmId}`
    );
  }

  public getCinemaBySeance(seanceId: number): Observable<Cinema> {
    return this.httpClient.get<Cinema>(
      `${this.apiServerUrl}/by-seance/${seanceId}`
    );
  }

  public addFilm(formData: FormData): Observable<any> {
    return this.httpClient.post<Film>(
      this.apiServerUrl + 'films/ajouter',
      formData
    );
  }

  public getFilmCinemas(filmId: number): Observable<Cinema[]> {
    return this.httpClient.get<Cinema[]>(
      `${this.apiServerUrl}films/cinemas/${filmId}`
    );
  }

  public fetchFilmImage(movieId: number): Observable<Image> {
    return this.httpClient.get<Image>(
      this.apiServerUrl + `films/image/${movieId}`
    );
  }

  public updateFilm(filmId: number, formData: FormData): Observable<string> {
    return this.httpClient.put<string>(
      `${this.apiServerUrl}films/update/${filmId}`,
      formData
    );
  }

  public deleteFilm(filmId: number): Observable<string> {
    return this.httpClient.delete<string>(
      `${this.apiServerUrl}films/delete/${filmId}`
    );
  }
}
