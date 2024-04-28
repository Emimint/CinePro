import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiServerUrl}api/v1/auth/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          window.location.reload();
          return response;
        }),
        catchError(this.handleError)
      );
  }

  register(
    nom: string,
    prenom: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiServerUrl}api/v1/auth/register`, {
        nom,
        prenom,
        email,
        password,
        role: 'UTILISATEUR',
      })
      .pipe(
        map((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/accueil']);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    try {
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/accueil']);
    } catch (error) {
      console.error(
        'Erreur lors de la suppression du jeton depuis le stockage local:',
        error
      );
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem(this.tokenKey);
    } else {
      return false;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "Une erreur s'est produite";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client: ${error.error.message}`;
    } else {
      errorMessage = `Erreur côté serveur: ${error.status} - ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
