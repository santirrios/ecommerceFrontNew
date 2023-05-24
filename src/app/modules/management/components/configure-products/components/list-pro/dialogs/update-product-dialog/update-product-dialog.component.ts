import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { catchError, of, Subscription } from 'rxjs';
import { Category } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service'
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseServer } from 'src/app/models/response-server';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private toastrService: ToastrService
  ) { }
  updateProduct: FormGroup = new FormGroup({})
  subscriptions$: Subscription[] = []
  categories: Category[] = []
  controls: FormControl[] = []
  ngOnInit(): void {
    for (let i = 0; i < this.data.images.length; i++) {
      this.controls.push(new FormControl(this.data.images[i].url, [Validators.required]))
    }
    this.updateProduct = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(49)
      ]),
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.maxLength(149)
      ]),
      categoryId: new FormControl(this.data.categoryId, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      price: new FormControl(this.data.price, [
        Validators.required
      ]),
      URLS: new FormArray([...this.controls])
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
      const imagesFormArray = this.updateProduct.get('URLS') as FormArray;
      imagesFormArray.push(new FormControl('', [Validators.required]))
    }
  }
  decreaseImage() {
    if (this.controls.length > 1) {
      this.controls.pop()
      const imagesFormArray = this.updateProduct.get('URLS') as FormArray;
      imagesFormArray.removeAt(imagesFormArray.length - 1)
    }
  }
  sendData() {
    this.productsService.update(this.updateProduct.value, this.data.productId)
      .pipe(
        catchError(err => {
          console.log('something went wrong', err)
          return of()
        })
      )
      .subscribe((data: ResponseServer) => {
        const { success, message, result } = data
        if (success) {
          this.toastrService.success('Se agrego el producto correctamente', 'SUCCESS')
          this.updateProduct.reset()
          this.productsService.getAll();
          this.dialogRef.close()
        }else{
          this.toastrService.error(message,'ERROR')
        }
      })
  }
  closeDialog() {
    this.dialogRef.close()
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
