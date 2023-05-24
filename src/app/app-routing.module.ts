import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from './views/not-found/not-found.component'
import {MainComponentComponent} from './modules/main-page/view/main-component/main-component.component'
import { ManagementComponent } from './modules/management/view/management/management.component';
import { ViewComponent } from './modules/authentication/view/view.component';
import {SessionGuard} from 'src/app/core/guards/session.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard'


const routes: Routes = [
  {
    path:'',
    component:MainComponentComponent,
    loadChildren:() => import('./modules/main-page/main-page.module').then(m => m.MainPageModule),
    canActivate:[SessionGuard]
  },
  {
    path:'admin',
    component:ManagementComponent,
    loadChildren:() => import('./modules/management/management.module').then(m => m.ManagementModule),
    canActivate:[SessionGuard]
    
  },
  {
    path:'authentication',
    component:ViewComponent,
    loadChildren:() => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
