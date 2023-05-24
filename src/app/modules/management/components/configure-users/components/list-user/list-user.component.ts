import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, catchError, of } from 'rxjs'
import { ResponseServer } from 'src/app/models/response-server';
import { UpdateUserComponent } from './dialogs/update-user/update-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit,OnDestroy {
  constructor(
    private snack:MatSnackBar,
    private dialog:MatDialog,
    private auth:AuthService
  ){}
  subscriptions$:Subscription[] = []
  displayedColumns: string[] = ['No.', 'ID','email', 'password','fname','lname','rol','buttons'];
  dataSource = new MatTableDataSource<User>();
  ngOnInit(): void {
    this.auth.getAll()
    const subscription1$ = this.auth.usuarios$
    .subscribe(res =>{
      this.dataSource = new MatTableDataSource<User>(res)
    })

    this.subscriptions$ = [subscription1$]
  }

  deleteUser(id:string):void{
    this.auth.delete(id)
    .pipe(
      catchError(err =>{
        this.snack.open(err,'CERRAR',{duration:5000})
        return of()
      })
    )
    .subscribe((res:ResponseServer) =>{
      const {success,message,result} = res
      if(success){
        this.auth.getAll()
      }
      this.snack.open(message,'CERRAR',{duration:5000})
    })
  }
  updateUser(user:User):void{
    this.dialog.open(UpdateUserComponent,{
      data:user,
      width:'60%'
    })
  }
  


  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
