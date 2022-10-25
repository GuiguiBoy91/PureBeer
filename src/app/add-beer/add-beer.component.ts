import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.css']
})
export class AddBeerComponent implements OnInit {

  name="";
  description="";
  errorMsg="";
  succesMsg="";
  isLoged: boolean = false;

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
        this.isLoged= true;
      }, (err) => {
        this.isLoged = false;
        this.router.navigate(['login']);
      }
    );
  }

  addBeer(){
    this.http.post(environment.apiUrl + '/beer', {name: this.name}).subscribe(
      (res) => {
        this.succesMsg = "Beer added";
      }, (err) => {
        this.errorMsg = "Error adding beer";
      }
    );
  }

}
