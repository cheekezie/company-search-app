import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SearchResultComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SearchResultRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class SearchResultModule {}
