import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { Login } from '../shared/models/login';
import { Router } from '@angular/router';
import { AuthLoginResponse } from '../shared/models/auth-login-response';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string = '';
  fb = inject(FormBuilder);
  router = inject(Router)
  http = inject(HttpClient);
  apiCallService = inject(ApiCallService);
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
  onRegister() {
    //handle register
  }
  onLogin() {
    this.apiCallService.postHttpCall<any>('authLogin', this.loginForm.value).subscribe({
      next: (res) => {
        console.log('next', res)
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/home']);
      }
      , error: (err) => {
        console.log('err', err);
        this.errorMessage = "Usuario ou senha incorretos";
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
  onForgotPassword() {
    //handle forgot password
  }
}
