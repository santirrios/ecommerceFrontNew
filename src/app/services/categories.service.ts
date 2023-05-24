import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import {Observable,BehaviorSubject, catchError, of} from 'rxjs'
import { Category } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly URL = environment.api
  constructor(
    private http:HttpClient
  ) { }
  categories$:BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([])
  getAll(){
    this.http.get<Category[]>(`${this.URL}categories/getall`)
    .pipe(
      catchError(err =>{
        console.log('something went wrong',err)
        return of()
      })
    )
    .subscribe((res:any) =>{
      const {success,message,result} = res
      this.categories$.next(result)
    })
  }
  addCategory(name:string,description:string):Observable<any>{
    const body = {
      name,
      description
    }
    return this.http.post(`${this.URL}categories/add`,body)
  }
  deleteCategory(id:string):Observable<any>{
    return this.http.delete(`${this.URL}categories/delete/${id}`)
  }
  updateCategory(name:string,description:string,id:string){
    const body = {
      name,
      description
    }
    return this.http.put(`${this.URL}categories/update/${id}`,body)
  }
  getOne(id:string):Observable<any>{
    return this.http.get(`${this.URL}categories/getone/${id}`)
  }

}
