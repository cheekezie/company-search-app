import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { CompanyProfileI } from '../utils/interfaces/company.interface';
import { SearchService } from '../utils/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchCtrl: FormControl = new FormControl('', Validators.required);
  searching = false;
  companies: CompanyProfileI[] = [];
  activeTab = 0;
  constructor(
    private _searchS: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const queryString =
      this.activatedRoute.snapshot.queryParamMap.get('search');
    if (queryString) {
      this.activeTab = 1;
      this.searchCtrl.patchValue(queryString);
      this.search();
    }
  }

  search() {
    if (this.searchCtrl.invalid) {
      this.searchCtrl.markAsTouched();
      return;
    }
    this.searching = true;
    this._searchS.searchCompanies(this.searchCtrl.value).subscribe({
      next: (res) => {
        const queryParams = {
          search: this.searchCtrl.value,
        };
        this.router.navigate(['/'], {
          queryParams,
        });
        this.companies = res.items;
        this.searching = false;
        this.activeTab = 1;
      },
      error: (res) => {
        this.searching = false;
      },
    });
  }

  // Go back to search view to search again
  backToSearch() {
    this.activeTab = 0;
    this.companies = [];
  }

  // Go back to company details
  goToCompany(company: CompanyProfileI) {
    console.log('company:', company);

    localStorage.setItem(
      LocalStoreEnums.COMPANYPROFILE,
      JSON.stringify(company)
    );
    this.router.navigate(['', company.company_number]);
  }
}
