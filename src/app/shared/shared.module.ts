import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NavComponent} from './components/nav/nav.component'
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports:[
    NavComponent
  ]
})
export class SharedModule { }
