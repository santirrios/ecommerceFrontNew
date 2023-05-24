import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './modules/login/login.component';
import { LogupComponent } from './modules/logup/logup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ViewComponent,
    LoginComponent,
    LogupComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AuthenticationModule { }
