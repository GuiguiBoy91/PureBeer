import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  beers: any;
  types: any;
  apiUrl: string = environment.imgUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.verifyToken();
    this.getAllTypes();
    this.getAllBeers();
  }

  verifyToken() {
    this.auth.ValidateToken().subscribe(
      (res) => {
        true;
      },
      (err) => {
        this.router.navigate(['home']);
      }
    );
  }

  getAllTypes() {
    this.http
      .get(environment.apiUrl + '/types', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .subscribe(
        (res) => {
          this.types = res;          
        }
      );
  }

  getAllBeers() {
    this.http
      .get(environment.apiUrl + '/beers', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .subscribe(
        (res) => {
          this.beers = res;
        }
      );
  }

  filterBeer(beers: any, type: any) {
    return beers.filter((beer: any) => beer.typeId == type.id);
  }

  imgPath(img: string) {
    if (img) {
      return this.apiUrl + img.replace('uploads', '');
    }else{
      return "assets/images/empty.jpg";
    }
  }

}
