import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import {Observable,BehaviorSubject, catchError, of} from 'rxjs'
import {CreateProduct, Product} from 'src/app/models/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient
  ) { }
  private readonly URL = environment.api
  products$:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  getAll(){
    this.http.get(`${this.URL}products/getall`)
    .subscribe((res:any) =>{
      const {success,message,result} = res
      this.products$.next(result)
    })
  }
  add(product:CreateProduct):Observable<any>{
    return this.http.post(`${this.URL}products/add`,product)
  }
  delete(id:string):Observable<any>{
    return this.http.delete(`${this.URL}products/delete/${id}`)
  }
  update(product:CreateProduct,id:string):Observable<any>{
    return this.http.put(`${this.URL}products/update/${id}`,product)
  }
}
