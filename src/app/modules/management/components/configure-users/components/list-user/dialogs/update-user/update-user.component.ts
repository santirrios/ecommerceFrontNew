import { Component, Inject,OnInit,OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ResponseServer } from 'src/app/models/response-server';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit,OnDestroy {
  constructor(
    private auth: AuthService,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }
  tipoInput: 'password' | 'text' = 'password'
  formLogup: FormGroup = new FormGroup({})
  errorSesion: boolean = false
  errorMessage: string = ''
  subscriptions$:Subscription[] = []
  user:User = {
    userId:'',
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    rol:'user'
  }
  ngOnInit(): void {
    const subscription1$ = this.auth.usuario$
    .subscribe(res => {
      this.user = res
    })
    this.formLogup = new FormGroup({
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.data.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(59)
      ]),
      firstName: new FormControl(this.data.firstName, [
        Validators.required,
        Validators.maxLength(49)
      ]),
      lastName: new FormControl(this.data.lastName, [
        Validators.required,
        Validators.maxLength(49)
      ]),
      rol: new FormControl(this.data.rol, [
        Validators.required
      ])
    })
    this.subscriptions$ = [subscription1$]
  }
  updateUser(): void {
    const { email, password, firstName, lastName, rol } = this.formLogup.value
    if (email !== this.data.email) {
      this.auth.verifyEmail(email)
        .subscribe((res: ResponseServer) => {
          const { success, message } = res
          if (!success) {
            this.errorSesion = true
            this.errorMessage = message
          } else {
            this.errorSesion = false
            this.errorMessage = ''
            this.auth.update(email, password, firstName, lastName, rol, this.data.userId)
              .subscribe((res: ResponseServer) => {
                const { success, message, result } = res
                if (!success) {
                  this.errorSesion = true
                  this.errorMessage = message
                } else {
                  this.errorSesion = false
                  this.errorMessage = ''
                  this.snack.open(message, 'cerrar', {
                    duration: 5000
                  })
                  if(this.data.userId === this.user.userId){
                    this.auth.usuario$.next(result)
                  }
                  this.auth.getAll()
                  this.formLogup.reset()
                  this.dialogRef.close()
                }
              })
          }
        })
    } else {
      this.auth.update(email, password, firstName, lastName, rol, this.data.userId)
        .subscribe((res: ResponseServer) => {
          const { success, message, result } = res
          if (!success) {
            this.errorSesion = true
            this.errorMessage = message
          } else {
            this.errorSesion = false
            this.errorMessage = ''
            this.snack.open(message, 'cerrar', {
              duration: 5000
            })
            if(this.data.userId === this.user.userId){
              this.auth.usuario$.next(result)
            }
            this.auth.getAll()
            this.formLogup.reset()
            this.dialogRef.close()
          }
        })
    }
  }
  verContrasena() {
    this.tipoInput = this.tipoInput === 'password' ? 'text' : 'password';
  }
  closeDialog() {
    this.dialogRef.close()
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
