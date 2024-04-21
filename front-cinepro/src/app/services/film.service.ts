import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Film } from '../models/film';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiServerUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Film[]> {
    return this.httpClient.get<Film[]>(this.apiServerUrl + 'films/tous');
  }

  // public fetchFilmImage(movieId: number): Observable<Image> {
  //   return this.httpClient.get<Image>(this.imageURL + `image/${movieId}`);
  // }
}
