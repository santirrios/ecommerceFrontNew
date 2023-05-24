import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainComponentComponent } from './view/main-component/main-component.component';

import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component'
import {MainComponent} from './components/main/main.component'
import {ProductComponent} from './components/main/components/product/product.component'
import {ProductDetailComponent} from './components/product-detail/product-detail.component'
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    MainComponentComponent,
    ShoppingCartComponent,
    MainComponent,
    ProductComponent,
    ProductDetailComponent,
    CategoryComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class MainPageModule { }
