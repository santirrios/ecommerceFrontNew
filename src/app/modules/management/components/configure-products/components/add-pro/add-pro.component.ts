import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { CreateProduct } from 'src/app/models/product'
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service'
import { CategoriesService } from 'src/app/services/categories.service'
import { catchError, Subscription, of } from 'rxjs';
import { Category } from 'src/app/models/categories';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseServer } from 'src/app/models/response-server';



@Component({
  selector: 'app-add-pro',
  templateUrl: './add-pro.component.html',
  styleUrls: ['./add-pro.component.css']
})
export class AddProComponent implements OnInit, OnDestroy {
  constructor(
    private ToastrService: ToastrService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  createProduct: FormGroup = new FormGroup({})
  subscriptions$: Subscription[] = []
  categories: Category[] = []
  controls: FormControl[] = [new FormControl('', [Validators.required])]
  ngOnInit(): void {
    this.createProduct = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(49)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(149)
      ]),
      categoryId: new FormControl('', [
        Validators.required,
        Validators.maxLength(40)
      ]),
      price: new FormControl(0, [
        Validators.required
      ]),
      URLS: new FormArray([
        new FormControl('', [Validators.required])
      ])
    })
    const subscription1$ = this.categoriesService.categories$
      .subscribe(res => {
        this.categories = res
      })
    this.subscriptions$ = [subscription1$]
  }
  incrementImage() {
    if (this.controls.length < 10) {
      this.controls.push(new FormControl())
      const imagesFormArray = this.createProduct.get('URLS') as FormArray;
      imagesFormArray.push(new FormControl('', [Validators.required]))
    }
  }
  decreaseImage() {
    if (this.controls.length > 1) {
      this.controls.pop()
      const imagesFormArray = this.createProduct.get('URLS') as FormArray;
      imagesFormArray.removeAt(imagesFormArray.length - 1)
    }
  }

  sendData() {
    this.productsService.add(this.createProduct.value)
      .pipe(
        catchError(err => {
          console.log('something went wrong', err)
          return of()
        })
      )
      .subscribe((data:ResponseServer) => {
        const {success,message,result} = data
        if(success){
          this.ToastrService.success('Se agrego el producto correctamente', 'SUCCESS')
          this.createProduct.reset()
          this.productsService.getAll();
        }else{
          this.ToastrService.error(message,'ERROR')
        }  
      })
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
