import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMsg="";
  succesMsg="";
  username="";
  password="";
  confirmpassword="";

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) { }

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

  register(){
    if (this.username.trim().length < 6) {
      this.errorMsg = 'Username needs to be at least 6 characters';
    } else if (this.password.trim().length < 6) {
      this.errorMsg = 'Password needs to be at least 6 characters';
    } else if (this.password != this.confirmpassword) {
      this.errorMsg = 'Passwords do not match';
    } else {
      this.http.post<any>(environment.apiUrl + '/auth/register', {username: this.username, password: this.password}).subscribe(res=>{
        this.succesMsg="User created succesfully, redirecting to login page";
        setTimeout(() => {this.router.navigate(['login']);}, 1500);
        
      }, err => {
        console.log(err);
        this.errorMsg = 'Username Already Exists';
      });
    }
      
  }

}
