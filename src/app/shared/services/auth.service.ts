import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    console.log("isLoggedIn");
    const token = this.getToken();
    const check = !!token && !this.isTokenExpired(token);
    console.log("check", check);
    return check
  }

  logout(): void {
    localStorage.removeItem('token');
    // e refresh_token se tiver
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return (decoded.exp * 1000) < Date.now();
  }
}
