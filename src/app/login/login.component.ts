import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMsg = '';
  token = '';

  constructor(private router: Router, private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken() {
    this.auth.ValidateToken().subscribe(
      (res) => {
        this.router.navigate(['home']);
      }
    );
  }

  login() {
    if (this.username.trim().length === 0) {
      this.errorMsg = 'Username is required';
    } else if (this.password.trim().length === 0) {
      this.errorMsg = 'Password is required';
    } else {
      this.http.post<any>(environment.apiUrl + '/auth/login', {username: this.username, password: this.password}).subscribe(res=>{
        this.token = res.token;
        this.auth.setToken(this.token);
        this.router.navigate(['home']);
      }, err => {
        console.log(err);
        this.errorMsg = 'Invalid Credentials';
      });
    }
  }
}
