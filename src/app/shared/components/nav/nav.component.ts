import { Component, OnInit,OnDestroy} from '@angular/core';
import {MyCartService} from '../../../services/my-cart.service'
import {AuthService} from 'src/app/services/auth.service'
import {User} from 'src/app/models/user'
import { BehaviorSubject, Subscription,catchError,of } from 'rxjs';
import {CategoriesService} from 'src/app/services/categories.service'
import {ResponseServer} from 'src/app/models/response-server'
import {Category} from 'src/app/models/categories'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit,OnDestroy {
  constructor(
    private MyCartService:MyCartService,
    private auth:AuthService,
    private categoriesService:CategoriesService,
    private cookie:CookieService,
    private router:Router,
    private productService:ProductsService,
    private myCart:MyCartService
  ){}
  length = 0;
  user:User|undefined = undefined
  subscriptions$:Array<Subscription> = []
  categories:Array<Category> = []
  ngOnInit(): void {
    const subscription1$ = this.MyCartService.myProducts$.subscribe(products => {
      this.length = products.length;
    })
    const subscription2$ = this.auth.usuario$.subscribe((user:User) =>{
      this.user = user
    })
    this.categoriesService.getAll()
    this.productService.getAll()
    
    const subscription3$ = this.categoriesService.categories$
    .subscribe(data =>{
      this.categories = data
    })
    this.subscriptions$ = [subscription1$,subscription2$,subscription3$]
  }

  logOut(){
    this.myCart.deleteAll()
    this.cookie.delete('token','/')
    this.router.navigate(['authentication'])
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe())
  }
}