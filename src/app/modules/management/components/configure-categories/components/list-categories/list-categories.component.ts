import { Component, OnInit,OnDestroy} from '@angular/core';
import { catchError,Observable,of, Subscription } from 'rxjs';
import {CategoriesService} from 'src/app/services/categories.service'
import {ResponseServer} from 'src/app/models/response-server'
import {Category} from 'src/app/models/categories'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from './dialogs/update/update.component';
import {ProductsService} from 'src/app/services/products.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit,OnDestroy {
  constructor(
    private categoriesService:CategoriesService,
    private snack:MatSnackBar,
    private dialog:MatDialog,
    private productsService:ProductsService
  ){}
  subscriptions$:Subscription[] = []
  displayedColumns: string[] = ['No.', 'ID','NAME', 'Description','buttons'];
  dataSource = new MatTableDataSource<Category>();
  ngOnInit(): void {
    const subscription1$ =this.categoriesService.categories$
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource<Category>(res);
    })
    this.subscriptions$ = [subscription1$]
  }

  deleteCategory(id:string):void{
    this.categoriesService.deleteCategory(id)
    .pipe(
      catchError(err => {
        console.log('something went wrong',err)
        return of()
      })
    )
    .subscribe((res:ResponseServer) =>{
      const{success,message,result} = res
      this.snack.open(message,'cerrar',{
        duration:4000
      })
      this.categoriesService.getAll()
      this.productsService.getAll()
    })
  }
  updateCategory(category:Category){
    this.dialog.open(UpdateComponent,{
      data:category,
      width:'60%'
    })
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe())
  }

}
