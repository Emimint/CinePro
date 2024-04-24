import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.apiServerUrl + 'api/v1/auth/authenticate', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          // Store JWT token in local storage or cookie
          localStorage.setItem(this.tokenKey, response.token);
          return response;
        })
      );
  }

  logout() {
    // Remove JWT token from local storage
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is logged in based on presence of JWT token
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem(this.tokenKey);
    } else {
      // Handle case where localStorage is not available
      return false;
    }
  }
}
