import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    CompanyDetailsRoutingModule,
  ],
})
export class CompanyDetailsModule {}
