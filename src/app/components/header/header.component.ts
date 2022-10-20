import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoged: boolean = false;
  user: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken() {
    this.auth.ValidateToken().subscribe(
      (res) => {
        this.isLoged = true;
      },
      (err) => {
        this.isLoged = false;
      }
    );

    this.http
      .get(environment.apiUrl + '/users/me', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .subscribe(
        (res) => {
          this.user = res;
        }
      );
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  Logout() {
    this.auth.Logout();
    this.router.navigate(['login']);
  }
}
