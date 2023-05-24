import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoriesService} from 'src/app/services/categories.service'
import {of,catchError} from 'rxjs'
import {ResponseServer} from 'src/app/models/response-server'
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { Category } from 'src/app/models/categories';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  constructor(
    private categoriesService:CategoriesService,
    private snack:MatSnackBar,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ){}
  formCategory:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.formCategory = new FormGroup({
      name:new FormControl(this.data.name,[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(49)
      ]),
      description:new FormControl(this.data.description,[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(119)
      ])
    })
  }

  updateCategory():void{
    const {name,description} = this.formCategory.value
    const id = this.data.categoryId
    this.categoriesService.updateCategory(name,description,id)
    .pipe(
      catchError(err =>{
        console.log('something went wrong',err)
        return of()
      })
    )
    .subscribe((res:any) =>{
      const {success,message,result} = res
      if(success){
        this.categoriesService.getAll()
        this.snack.open(message, 'Cerrar', {
          duration: 3000,
        });
        this.dialogRef.close()
      }else{
        this.snack.open(message, 'Cerrar', {
          duration: 3000,
        });
        console.log('something went wrong',message)
      }
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }
}