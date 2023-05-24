import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service'
import { Subscription } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResponseServer } from 'src/app/models/response-server'
import { Category } from 'src/app/models/categories'
@Component({
  selector: 'app-configure-products',
  templateUrl: './configure-products.component.html',
  styleUrls: ['./configure-products.component.css']
})
export class ConfigureProductsComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService
  ) { }
  categories: Category[] | null = null
  areThereCategories: boolean = false;
  subscriptions$: Subscription[] = []
  ngOnInit(): void {
    const subscription1$ = this.categoriesService.categories$
      .subscribe(res => {
        this.categories = res;
      })

    this.subscriptions$ = [subscription1$]
  }


  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
