import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product, CreateProduct } from 'src/app/models/product'
import { ToastrService } from 'ngx-toastr';

import { ProductsService } from 'src/app/services/products.service'
import { CategoriesService } from 'src/app/services/categories.service'
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/categories';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductDialogComponent } from './dialogs/update-product-dialog/update-product-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseServer } from 'src/app/models/response-server';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css']
})
export class ListProComponent implements OnInit, OnDestroy {
  constructor(
    private ToastrService: ToastrService,
    private dialog: MatDialog,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }
  products: Product[] = []
  displayedColumns: string[] = ['No.', 'ID', 'CategoryID', 'NAME', 'Description', 'Price', 'Image', 'buttons'];
  dataSource = new MatTableDataSource<Product>();

  subscriptions$: Subscription[] = []
  categories: Category[] = []
  ngOnInit(): void {
    const subscription$1 = this.categoriesService.categories$.subscribe(res => {
      this.categories = res
    })
    const subscription2$ = this.productsService.products$.subscribe(res => {
      this.products = res
      this.dataSource = new MatTableDataSource<Product>(res)
    })
    this.subscriptions$ = [subscription$1, subscription2$]
  }
  deleteProduct(id: string) {
    if (id != "") {
      this.productsService.delete(id)
        .subscribe((data: ResponseServer) => {
          const { success, message, result } = data
          if (success) {
            id = "";
            this.ToastrService.success('se elimino el producto')
            this.productsService.getAll()
          }else{
            this.ToastrService.error(message,'ERROR')
          }
        })
    } else {
      this.ToastrService.warning("por favor ingrese el id para eliminar")
    }
  }

  openModal(product: Product) {
    this.dialog.open(UpdateProductDialogComponent, {
      data: product,
      width: '60%'
    })
    /*  this.id = product.productId;
     this.product = product;
     this.cantidadImagenes = this.product.images.length;
     this.cantidad = [];
     for (let i = 0; i < this.cantidadImagenes; i++) {
       this.cantidad.push(i)
     } */
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }

}
