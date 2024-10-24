import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpParams,
  HttpRequest,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class HttpinterceptorService {
  constructor(private _authS: AuthService, private _alertS: AlertService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apikey = 'KjTFKEGi7R11DuvLSPaV16IJLfTPCkKV3qowOXtE';
    const corsPrefix = 'https://corsproxy.io/?'; // To fix CORS temporarily on local development
    const baseUrl =
      'https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/';

    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'x-api-key': apikey,
      },
      url: baseUrl + request.url,
      //url: corsPrefix + baseUrl + request.url,
    });

    return next.handle(request);
  }
}
