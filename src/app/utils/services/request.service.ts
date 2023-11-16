import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) { }

  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(endpoint, { params });
  }

  post<T>(endpoint: string, data: Object): Observable<T> {
    return this.http.post<T>(endpoint, data);
  }

  put<T>(endpoint: string, data: Object): Observable<T> {
    return this.http.put<T>(endpoint, data);
  }

  patch<T>(endpoint: string, data: Object): Observable<T> {
    return this.http.patch<T>(endpoint, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(endpoint);
  }
}
