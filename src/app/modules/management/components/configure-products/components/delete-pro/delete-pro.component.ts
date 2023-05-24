import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-pro',
  templateUrl: './delete-pro.component.html',
  styleUrls: ['./delete-pro.component.css']
})
export class DeleteProComponent {
  constructor(
    private http:HttpClient,
    private ToastrService:ToastrService
  ){}
  id="";

  deleteProduct(){
    if(this.id!=""){
      this.http.delete(`https://localhost:7007/product/delete/${this.id}`)
      .subscribe(data => {
        this.id="";
        this.ToastrService.success("Se borro correctamente");
      })
    }else{
      this.ToastrService.warning("por favor ingrese el id para eliminar")
    }
  }

}
