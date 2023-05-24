import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseServer } from 'src/app/models/response-server';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snack:MatSnackBar
  ) { }
  formLogup: FormGroup = new FormGroup({})
  errorSesion: boolean = false
  errorMessage: string = ''
  ngOnInit(): void {
    this.formLogup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(59)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(49)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(49)
      ])
    })
  }
  sendLogup(): void {
    const { email, password, firstName, lastName } = this.formLogup.value
    this.auth.verifyEmail(email)
      .subscribe((res: ResponseServer) => {
        const { success, message } = res
        if (!success) {
          this.errorSesion = true
          this.errorMessage = message
        } else {
          this.errorSesion = false
          this.errorMessage = ''
          this.auth.logUp(email, password, firstName, lastName)
            .subscribe((res: ResponseServer) => {
              const { success, message, result } = res
              if (!success) {
                this.errorSesion = true
                this.errorMessage = message
              } else {
                this.errorSesion = false
                this.errorMessage = ''
                this.snack.open(message,'cerrar',{
                  duration:5000
                })
                this.formLogup.reset()
                this.router.navigate([''])
              }
            })
        }
      })
  }

}
