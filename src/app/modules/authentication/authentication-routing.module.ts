import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { LogupComponent } from './modules/logup/logup.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'logup',
    component:LogupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
