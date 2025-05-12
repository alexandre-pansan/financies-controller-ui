import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { EMPTY } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  //check if token exists
  if (token && req.url !== '/login') {
    const decoded = jwtDecode<JwtPayload>(token);
    const expired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;
    //check if token is expired
    if (expired) {
      localStorage.removeItem('token');
      //redirect to login page
      router.navigate(['/login']);
      return EMPTY;//returns the request without the token
    }

    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
  }

  return next(req);
};
