import { Component } from '@angular/core';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../utils/services/search.service';
import {
  CompanyProfileI,
  OfficerProfileI,
} from '../utils/interfaces/company.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent {
  loading = false;
  company!: CompanyProfileI;
  activeTab = 0;
  activeCompanyNumber = '';
  officers: OfficerProfileI[] = [];
  constructor(
    private _searchS: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    const company = localStorage.getItem(LocalStoreEnums.COMPANYPROFILE);
    if (!company) {
      this.router.navigate(['/']);
      return;
    }
    this.company = JSON.parse(company);
    this.title.setTitle(this.company.title);
  }

  // Go back to search result or manin company profile tab
  goBack() {
    if (this.activeTab === 1) {
      this.activeTab = 0;
      this.activeCompanyNumber = '';
      return;
    }
    const queryString =
      this.activatedRoute.snapshot.queryParamMap.get('search');
    this.router.navigate(['/search', queryString]);
  }

  // Go to officers view
  goToOfficers() {
    this.activeTab = 1;
    this.loading = true;
    this._searchS.companyOfficers(this.company?.company_number!!).subscribe({
      next: (res) => {
        this.officers = res.items;
        this.loading = false;
      },
      error: (res) => {
        this.loading = false;
      },
    });
  }
}
