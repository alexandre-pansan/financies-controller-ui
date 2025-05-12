import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string = '';
  fb = inject(FormBuilder);
  apiCallService = inject(ApiCallService);
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
  onRegister() {
    //handle register
  }
  onLogin() {
    //handle login
    this.apiCallService.postHttpCall('authLogin', this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
      }
      , error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
  }
  onForgotPassword() {
    //handle forgot password
  }
}
