import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {CreateProduct} from'src/app/models/product'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-pro',
  templateUrl: './update-pro.component.html',
  styleUrls: ['./update-pro.component.css']
})
export class UpdateProComponent {
  constructor(
    private ToastrService:ToastrService,
    private http:HttpClient
  ){}
  cantidadImagenes = 1;
  cantidad: number[] = [0];
  id="";
  product:CreateProduct={
    images:[],
    name:'',
    description:'',
    category:'',
    price:'',
  }

  cambioNumero() {
    if (this.cantidadImagenes > 0 && this.cantidadImagenes < 11) {
      this.cantidad = [];
      for (let i = 0; i < this.cantidadImagenes; i++) {
        this.cantidad.push(i)
      }
    }
  }

  updateData(){
    if(this.product.name!='' && this.product.category!='' && this.product.description!='' && this.product.price!='' && this.product.images.length!=0){
      this.product.price = this.product.price.toString();
      this.http.put(`https://localhost:7007/product/put/${this.id}`,this.product)
      .subscribe(data => {
        console.log('CREATED',data)
        this.ToastrService.success('Se actualizo el producto correctamente')
        this.product={
          images:[],
          name:'',
          description:'',
          category:'',
          price:'',
        }
        this.cantidadImagenes=1;
      })
      
    }else{
      this.ToastrService.warning('llene todos los campos por favor')
    }
  }

}
