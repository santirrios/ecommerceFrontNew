import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureCategoriesComponent } from './components/configure-categories/configure-categories.component';
import { ConfigureProductsComponent } from './components/configure-products/configure-products.component';
import { ConfigureUsersComponent } from './components/configure-users/configure-users.component';

const routes: Routes = [
  {
    path:'configurep',
    component:ConfigureProductsComponent
  },
  {
    path:'configurec',
    component:ConfigureCategoriesComponent
  },
  {
    path:'configureu',
    component:ConfigureUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
