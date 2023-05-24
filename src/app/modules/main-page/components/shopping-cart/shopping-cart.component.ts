import { Component, OnInit } from '@angular/core';
import { MyCartService } from '../../../../services/my-cart.service'
import {Product} from '../../../../models/product'


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private MyCartService: MyCartService
  ) { }
  products: Product[] = [];
  total: number = 0;
  ngOnInit(): void {
    this.MyCartService.myProducts$.subscribe(products => {
      this.products = products;
      products.forEach(produ => {
        try {
          let pr = produ.price;
          let price = Number(pr);
          this.total += price
        }catch(err){
          console.error(err);
        }
        
      })
    })
  }
}
