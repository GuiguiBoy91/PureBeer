import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoged: boolean = false;

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
        this.isLoged = true;
      },
      (err) => {
        this.isLoged = false;
      }
    );
  }

  goToAdd(){
    this.router.navigate(['add']);
  }

}
