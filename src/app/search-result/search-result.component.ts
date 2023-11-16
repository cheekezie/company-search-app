import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { CompanyProfileI } from '../utils/interfaces/company.interface';
import { SearchService } from '../utils/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap, take } from 'rxjs';
import { AuthService } from '../utils/services/auth.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searching = false;
  companies: CompanyProfileI[] = [];
  searchStr = '';
  pagination = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0,
  };
  searchSub$: Subscription = new Subscription();
  constructor(
    private _searchS: SearchService,
    private _authS: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchStr =
      this.activatedRoute.snapshot.paramMap.get('searchText') || '';
    this.search();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }

  search() {
    this.searching = true;
    this.searchSub$ = this._searchS
      .getSearchResult$()
      .pipe(
        take(1),
        switchMap((res) => {
          if (res) {
            return of(res);
          }
          return this._searchS.searchCompanies(this.searchStr);
        })
      )
      .subscribe({
        next: (res) => {
          const { items, page_number, total_results } = res;
          this.companies = items;
          this.pagination.currentPage = page_number;
          this.pagination.totalItems = total_results;
          this.searching = false;
        },
        error: (err) => {
          this.searching = false;
        },
      });
  }

  // Go to company details
  goToCompany(company: CompanyProfileI) {
    localStorage.setItem(
      LocalStoreEnums.COMPANYPROFILE,
      JSON.stringify(company)
    );
    const queryParams = {
      search: this.searchStr,
    };
    this.router.navigate(
      ['', company.company_number],
      this._authS.isLoggedIn ? { queryParams } : {}
    );
  }

  changePage(page: number) {}
}
