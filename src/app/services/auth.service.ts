import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable,BehaviorSubject} from 'rxjs'
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ResponseServer } from '../models/response-server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  usuario$:BehaviorSubject<any> = new BehaviorSubject({})
  usuarios$:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  private readonly URL = environment.api
  sendCredentials(email:string,password:string):  Observable<any>{
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}users/login`,body)
  }
  checkUser():Observable<any>{
    return this.http.get(`${this.URL}users/getuser`)
  }
  verifyEmail(email:string):Observable<any>{
    return this.http.get(`${this.URL}users/verifymail/${email}`)
  }
  logUp(email:string,password:string,firstName:string,lastName:string,rol:string = 'user'):Observable<any>{
    const body = {
      email,
      password,
      firstName,
      lastName,
      rol
    }
    return this.http.post(`${this.URL}users/logup`,body)
  }
  getAll(){
    this.http.get(`${this.URL}users/getall`)
    .subscribe((res:any) =>{
      const {success,message,result} = res
      if(success){
        this.usuarios$.next(result)
      }else{
        console.log('something went wrong',message)
      }
    })
  }
  delete(id:string):Observable<any>{
    return this.http.delete(`${this.URL}users/delete/${id}`)
  }
  update(email:string,password:string,firstName:string,lastName:string,rol:string = 'user',id:string):Observable<any>{
    const body = {
      email,
      password,
      firstName,
      lastName,
      rol
    }
    return this.http.put(`${this.URL}users/update/${id}`,body)
  }
}
