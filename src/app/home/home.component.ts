import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStoreEnums } from '../utils/enums/store.enum';
import { CompanyProfileI } from '../utils/interfaces/company.interface';
import { SearchService } from '../utils/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchCtrl: FormControl = new FormControl('', Validators.required);
  searching = false;
  companies: CompanyProfileI[] = [];
  activeTab = 0;
  constructor(private _searchS: SearchService, private router: Router) {}

  onSubmit() {
    if (this.searchCtrl.invalid) {
      this.searchCtrl.markAsTouched();
      return;
    }
    this.searching = true;
    this._searchS.searchCompanies(this.searchCtrl.value).subscribe({
      next: (res) => {
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
    localStorage.setItem(
      LocalStoreEnums.COMPANYPROFILE,
      JSON.stringify(company)
    );
    this.router.navigate(['', company.company_number]);
  }
}
