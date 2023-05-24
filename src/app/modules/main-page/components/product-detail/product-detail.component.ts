import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'

import { Product } from '../../../../models/product'

import { MyCartService } from '../../../../services/my-cart.service'
import { environment } from 'src/environments/environment'
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/categories';
import { Subscription } from 'rxjs';
import {  map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private MyCartService: MyCartService,
    private categoriesService: CategoriesService
  ) { }
  private readonly URL = environment.api
  productId: string | null = null;
  categories: Category[] = []
  subscriptions$: Subscription[] = []
  product: Product = {
    productId: "",
    name: "",
    description: "",
    categoryId: "",
    images: [
      {
        imageId: '',
        productId: '',
        url: ''
      }
    ],
    price: 0
  };
  category: string = ''
  id: string | null = "";
  cantidadImagenes = 0;
  contadorImagenes = 0;
  arrayCantidadImages: number[] = []


  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.id = params.get("id")
        if (this.id) {
          this.http.get<Product>(`${this.URL}products/getone/${this.id}`)
            .subscribe((data: any) => {
              this.product = data.result;
              this.cantidadImagenes = this.product.images.length;
              for (let i = 0; i < this.cantidadImagenes; i++) {
                this.arrayCantidadImages.push(i)
              }
              const subscription1$ = this.categoriesService.categories$
              .subscribe(cat => {
                this.categories = cat
                const cate = this.categories.find(c => c.categoryId === this.product.categoryId)
                if(cate){
                  this.category = cate.name
                }
              })
              this.subscriptions$ = [subscription1$]
            })
        }
      })
    
  }
  nextPicture() {
    if (this.contadorImagenes < this.cantidadImagenes - 1) {
      this.contadorImagenes++;
    }
  }
  previousPicture() {
    if (this.contadorImagenes > 0) {
      this.contadorImagenes--;
    }
  }
  addToCart() {
    this.MyCartService.addProduct(this.product);
  }
  clickCircle(i: number) {
    this.contadorImagenes = i;
  }


  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }

}
