import { Component } from '@angular/core';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { Router } from '@angular/router';
import { SearchService } from '../utils/services/search.service';
import {
  CompanyProfileI,
  OfficerProfileI,
} from '../utils/interfaces/company.interface';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent {
  loading = false;
  company: CompanyProfileI | undefined;
  activeTab = 0;
  activeCompanyNumber = '';
  officers: OfficerProfileI[] = [];
  constructor(private _searchS: SearchService, private router: Router) {}

  ngOnInit(): void {
    const company = localStorage.getItem(LocalStoreEnums.COMPANYPROFILE);
    if (!company) {
      this.router.navigate(['/']);
      return;
    }
    this.company = JSON.parse(company);
  }
  // Go back to company details view
  backToCompanyProfile() {
    this.activeTab = 0;
    this.activeCompanyNumber = '';
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
