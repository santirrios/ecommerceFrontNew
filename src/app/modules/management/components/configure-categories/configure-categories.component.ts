import { Component,OnInit } from '@angular/core';
import { Category } from 'src/app/models/categories';
import {CategoriesService} from 'src/app/services/categories.service'

@Component({
  selector: 'app-configure-categories',
  templateUrl: './configure-categories.component.html',
  styleUrls: ['./configure-categories.component.css']
})
export class ConfigureCategoriesComponent implements OnInit {
  constructor(
    private categoriesService:CategoriesService
  ){}
  ngOnInit(): void {
  }
  
}
