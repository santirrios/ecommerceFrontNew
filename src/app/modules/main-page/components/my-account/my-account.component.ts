import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ResponseServer } from 'src/app/models/response-server';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit,OnDestroy {
  constructor(private auth:AuthService, private snack: MatSnackBar){}
  subscriptions$:Subscription[] =[]
  formUser: FormGroup = new FormGroup({})
  tipoInput: 'password' | 'text' = 'password'
  user:User = {
    userId:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    rol:'user'
  }
  ngOnInit(): void {
    const subscription1$ = this.auth.usuario$
    .subscribe(user => {
      this.user = user
      this.formUser = new FormGroup({
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(59)
        ]),
        firstName: new FormControl(this.user.firstName, [
          Validators.required,
          Validators.maxLength(49)
        ]),
        lastName: new FormControl(this.user.lastName, [
          Validators.required,
          Validators.maxLength(49)
        ]),
        rol: new FormControl(this.user.rol, [
          Validators.required
        ])
      })
    })
    this.subscriptions$ = [subscription1$]
  }


  updateUser(){
    const { email, password, firstName, lastName, rol } = this.formUser.value
    if (email !== this.user.email) {
      this.auth.verifyEmail(email)
        .subscribe((res: ResponseServer) => {
          const { success, message } = res
          if (!success) {
            this.snack.open(message,'CERRAR',{duration:5000})
          } else {
            this.auth.update(email, password, firstName, lastName, rol, this.user.userId)
              .subscribe((res: ResponseServer) => {
                const { success, message, result } = res
                if (!success) {
                  this.snack.open(message,'CERRAR',{duration:5000})
                } else {
                  this.snack.open(message, 'cerrar', {
                    duration: 5000
                  })
                  this.auth.usuario$.next(result)
                }
              })
          }
        })
    } else {
      this.auth.update(email, password, firstName, lastName, rol, this.user.userId)
        .subscribe((res: ResponseServer) => {
          const { success, message, result } = res
          if (!success) {
            this.snack.open(message,'CERRAR',{duration:5000})
          } else {
            this.snack.open(message, 'cerrar', {
              duration: 5000
            })
            this.auth.usuario$.next(result)
          }
        })
    }
  }
  verContrasena() {
    this.tipoInput = this.tipoInput === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(s => s.unsubscribe())
  }
}
