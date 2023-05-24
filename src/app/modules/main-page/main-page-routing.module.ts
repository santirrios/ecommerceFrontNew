import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainComponent} from './components/main/main.component'
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component'
import {ProductDetailComponent} from './components/product-detail/product-detail.component'
import { CategoryComponent } from './components/category/category.component';
import { MyAccountComponent } from './components/my-account/my-account.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/main',
    pathMatch:'full'
  },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'shoppingcart',
    component:ShoppingCartComponent
  },
  {
    path:'product/:id',
    component:ProductDetailComponent
  },
  {
    path:'category/:id',
    component:CategoryComponent
  },
  {
    path:'account',
    component:MyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
