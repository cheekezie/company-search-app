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

  constructor(
    private _searchS: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  search() {
    if (this.searchCtrl.invalid) {
      this.searchCtrl.markAsTouched();
      return;
    }
    this.searching = true;
    const searchStr = this.searchCtrl.value;
    this._searchS.searchCompanies(searchStr).subscribe({
      next: (res) => {
        this.router.navigate(['/search', searchStr]);
        this.searching = false;
      },
      error: (res) => {
        this.searching = false;
      },
    });
  }
}
