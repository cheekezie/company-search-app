import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CompanyProfileI,
  CompanySearchResponseI,
  OfficerProfileResponseI,
} from '../interfaces/company.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResult$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  setSearchResults(data: CompanyProfileI[]) {
    this.searchResult$.next(data);
  }

  getSearchResult$(): Observable<CompanySearchResponseI> {
    return this.searchResult$;
  }

  searchCompanies(Query: string): Observable<CompanySearchResponseI> {
    return this.http.get(`Search?Query=${Query}`).pipe(
      map((v: any) => {
        this.setSearchResults(v);
        return v;
      })
    );
  }

  companyOfficers(CompanyNumber: string) {
    return this.http.get<OfficerProfileResponseI>(
      `Officers?CompanyNumber=${CompanyNumber}`
    );
  }
}
