import { Component,OnInit, OnDestroy } from '@angular/core';
import {Product} from '../../../../models/product'

import {ProductsService} from 'src/app/services/products.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy {
  constructor(
    private productsService:ProductsService
  ){}
  products:Product[] = [];
  lenghtProducts = 0;
  subscriptions$:Subscription[] = []
  recivedProduct:Product| undefined
  ngOnInit(): void {
    const subscription1$ = this.productsService.products$.subscribe(res =>{
      this.products = res
    })
    this.lenghtProducts = this.products.length;
    this.subscriptions$ = [subscription1$]
  }

  manejoEvento($event:Product){
    this.recivedProduct = $event
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach( s => s.unsubscribe())
  }
}
