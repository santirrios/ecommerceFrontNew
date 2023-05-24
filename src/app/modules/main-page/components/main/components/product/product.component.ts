import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../../../../models/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Output() productoEmitido = new EventEmitter<Product>();
  ngOnInit(): void {
  }
  @Input() product: Product = {
    productId: '',
    categoryId: '',
    description: '',
    name: '',
    images: [],
    price: 0
  }

  emitirProducto(){
    this.productoEmitido.emit(this.product)
  }


}
