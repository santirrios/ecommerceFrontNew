import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  constructor() { }
  products: Product[] = []
  private myProducts = new BehaviorSubject<Product[]>([])
  myProducts$ = this.myProducts.asObservable()

  addProduct(product:Product){
    this.products.push(product);
    this.myProducts.next(this.products);
  }
  deleteAll(){
    this.products = []
    this.myProducts.next(this.products)
  }
}
