import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'search/:searchText',
    loadChildren: () =>
      import('./search-result/search-result.module').then(
        (m) => m.SearchResultModule
      ),
  },
  {
    path: ':companyNumber',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./company-details/company-details.module').then(
        (m) => m.CompanyDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
