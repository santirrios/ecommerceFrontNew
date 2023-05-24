import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ResponseServer } from 'src/app/models/response-server'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private cookie: CookieService, private router: Router) { }
  formLogin: FormGroup = new FormGroup({})
  errorSesion: boolean = false
  errorMessage: string = ''
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(59),
        Validators.required
      ])
    })
  }
  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.auth.sendCredentials(email, password)
      .pipe(
        catchError(err => {
          console.log('error al iniciar sesion:' + err)
          this.errorSesion = true;
          return of()
        })
      )
      .subscribe((res: ResponseServer) => {
        const { message, result, success } = res
        if (!success) {
          this.errorSesion = true;
          this.errorMessage = message;
        } else {
          this.errorMessage = '';
          this.errorSesion = false;
          this.cookie.set('token', result, 4, '/')
          this.auth.checkUser()
          .pipe(
            catchError(err =>{
              console.log("error en login",err)
              return of()
            })
          )
          .subscribe((res:ResponseServer)=>{
            const {message,result,success} = res
            if(success){
              this.errorSesion = false;
              this.errorMessage = ''
              this.auth.usuario$.next(result)
              this.router.navigate(['/'])
            }else{
              this.errorSesion = true
              this.errorMessage = message
            }
          })
          
        }
      })

  }

}
