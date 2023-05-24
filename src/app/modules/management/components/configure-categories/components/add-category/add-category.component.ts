import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoriesService} from 'src/app/services/categories.service'
import {of,catchError} from 'rxjs'
import {ResponseServer} from 'src/app/models/response-server'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/categories';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private categoriesService:CategoriesService,
    private snack:MatSnackBar
  ){}
  formCategory:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.formCategory = new FormGroup({
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(49)
      ]),
      description:new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(119)
      ])
    })
  }

  sendCategory():void{
    const {name,description} = this.formCategory.value
    this.categoriesService.addCategory(name,description)
    .pipe(
      catchError(err =>{
        console.log('something went wrong',err)
        return of()
      })
    )
    .subscribe((res:ResponseServer) =>{
      const {success,message,result} = res
      if(success){
        this.categoriesService.getAll()
        this.snack.open(message, 'Cerrar', {
          duration: 3000,
        });
        this.formCategory.reset()
      }else{
        this.snack.open(message, 'Cerrar', {
          duration: 3000,
        });
        console.log('something went wrong',message)
      }
    })
  }
}
