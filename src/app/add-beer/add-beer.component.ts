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
  meData:any;
  typeId=0;
  beerAdded:any;

  errorMsg="";
  succesMsg="";
  
  selectedFile!: File;
  types: any;
  isLoged: boolean = false;

  constructor(    
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.verifyToken();
    this.getAllTypes();
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

    this.http
    .get(environment.apiUrl + '/users/me', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
    .subscribe(
      (res) => {
        this.meData=res
      }
    );
  }

  updateType(event: any){
    this.typeId = event.target.value;
  }


  addBeerPicture(beer_id: any){
    const fd = new FormData();
    fd.append('picture', this.selectedFile, this.selectedFile.name);
    this.http.post(environment.apiUrl + '/beers/' + beer_id + '/picture', fd, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }}).subscribe(
      (err) => {
        this.errorMsg = "Error adding beer picture";
      }
    );
  }

  addBeer(){
    this.http.post(environment.apiUrl + '/beers', {
      name: this.name,
      description: this.description,
      userId: this.meData.id,
      typeId: Number(this.typeId)
    }, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).subscribe(
      (res) => {
        this.beerAdded = res;        
        this.addBeerPicture(this.beerAdded.data.beer.id);
        this.succesMsg = "Beer added";
      }, (err) => {
        console.log(err);
        this.errorMsg = "Error adding beer";
      }
    );
  }

  getAllTypes(){
    this.http.get(environment.apiUrl + '/types', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).subscribe(
      (res) => {
        this.types = res;
        
      }, (err) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

}
