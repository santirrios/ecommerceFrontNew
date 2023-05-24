import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';

import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {ConfigureProductsComponent} from './components/configure-products/configure-products.component';
import { ManagementComponent } from './view/management/management.component'
import {ListProComponent} from './components/configure-products/components/list-pro/list-pro.component'
import {AddProComponent} from './components/configure-products/components/add-pro/add-pro.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigureCategoriesComponent } from './components/configure-categories/configure-categories.component';
import { AddCategoryComponent } from './components/configure-categories/components/add-category/add-category.component';
import { ListCategoriesComponent } from './components/configure-categories/components/list-categories/list-categories.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './components/configure-categories/components/list-categories/dialogs/update/update.component';
import { MatSelectModule } from '@angular/material/select';
import { UpdateProductDialogComponent } from './components/configure-products/components/list-pro/dialogs/update-product-dialog/update-product-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { ConfigureUsersComponent } from './components/configure-users/configure-users.component';
import { ListUserComponent } from './components/configure-users/components/list-user/list-user.component';
import{AddUserComponent} from './components/configure-users/components/add-user/add-user.component';
import { UpdateUserComponent } from './components/configure-users/components/list-user/dialogs/update-user/update-user.component'

@NgModule({
  declarations: [
    ManagementComponent,
    ConfigureProductsComponent,
    ListProComponent,
    AddProComponent,
    ConfigureCategoriesComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    UpdateComponent,
    UpdateProductDialogComponent,
    ConfigureUsersComponent,
    ListUserComponent,
    AddUserComponent,
    UpdateUserComponent

  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class ManagementModule { }
