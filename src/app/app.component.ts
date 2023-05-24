import { Component,OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service'
import {catchError} from 'rxjs/operators'
import {of} from 'rxjs'
import {ResponseServer} from 'src/app/models/response-server'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private auth:AuthService,
    private cookie:CookieService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.auth.checkUser()
    .pipe(
      catchError(err =>{
        console.log('something went wrong',err);
        return of()
      })
    )
    .subscribe((res:ResponseServer)=>{
      const {success,message,result} = res
      if(success){
        this.auth.usuario$.next(result)
      }else{
        this.cookie.delete('token','/')
        this.router.navigate(['authentication'])
      }
    })
  }
}
