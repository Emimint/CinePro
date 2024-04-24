import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;
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
          localStorage.setItem('token', response.token);
          return response;
        })
      );
  }

  logout() {
    // Remove JWT token from local storage or cookie
    localStorage.removeItem('token');
  }
}
