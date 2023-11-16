import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CompanyProfileI,
  CompanySearchResponseI,
  OfficerProfileResponseI,
} from '../interfaces/company.interface';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  corsPrefix = 'https://corsproxy.io/?'; // To fix CORS temporarily on local development
  baseUrl =
    this.corsPrefix +
    'https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/';
  constructor(private _reqS: RequestService, private http: HttpClient) {}

  searchCompanies(Query: string) {
    return this.http.get<CompanySearchResponseI>(`Search?Query=${Query}`);
  }

  companyOfficers(CompanyNumber: string) {
    return this.http.get<OfficerProfileResponseI>(
      `Officers?CompanyNumber=${CompanyNumber}`
    );
  }
}
