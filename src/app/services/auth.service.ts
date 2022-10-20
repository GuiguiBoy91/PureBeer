import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  ValidateToken() {
    return this.http.get(environment.apiUrl + '/auth/auth', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
  }

  Logout() {
    localStorage.removeItem('token');
  }
}
