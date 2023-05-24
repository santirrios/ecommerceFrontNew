import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { Category } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { ResponseServer } from 'src/app/models/response-server';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  constructor(
    private CategoriesService: CategoriesService,
    private route: ActivatedRoute,
  ) { }
  subscriptions$: Subscription[] = []
  id: string | null = ''
  category: Category = {
    categoryId : '',
    description : '',
    name:'',
    products : []
  }
  recivedProduct:Product| undefined
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id')
        if(id){
          this.CategoriesService.getOne(id)
          .pipe(
            catchError(err => {
              console.log('something went wrong', err)
              return of()
            })
          )
          .subscribe((res:ResponseServer) => {
            const {success,message,result} = res
            if(success){
              this.category = result
            }
          })
        }
        
      })

  }
  manejoEvento($event:Product){
    this.recivedProduct = $event
  }


  ngOnDestroy(): void {

  }
}
