import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookie:CookieService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }
  checkCookieSession(): boolean {
    try {
      const token: boolean = this.cookie.check('token')
      if (token === true) {
        this.router.navigate(['/'])
      }
      return !token
    } catch (err) {
      console.log('something went wrong', err);
      return false
    }
  }
  
}
