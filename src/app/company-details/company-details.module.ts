import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { CompanyDetailsComponent } from './company-details.component';

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CompanyDetailsRoutingModule,
  ],
})
export class CompanyDetailsModule {}
