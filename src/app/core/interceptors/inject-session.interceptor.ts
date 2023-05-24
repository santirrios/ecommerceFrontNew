import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from'ngx-cookie-service'
@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookie:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token = this.cookie.get('token')
      let newRequest = request
      newRequest = request.clone(
        {
          setHeaders:{
            authorization:`Bearer ${token}`
          }
        }
      )
      return next.handle(newRequest)
    }catch(err){
      console.log('ERROR EN INJECT-SESSION-INTERCEPTOR',err);
      console.log('REQUEST',request);
      return next.handle(request);
    }
  }
}
