import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { LoginModel } from '../models/login';
import { User } from '../models/user';



@Injectable ()

export class UserService {
    public url: string;
    private httpOptions: any;
    public token: string;
    public identity;
    public user = User;


  constructor(private http: HttpClient, private router: Router) {
      this.url = GLOBAL.url;
      this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  }

  register(newUser: any) {
      const parametros = JSON.stringify(newUser);
      this.token = localStorage.getItem('token');
      const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
      return this.http.post(this.url + 'users/register', parametros, headers );
          // .pipe(map(res => res.newUser()));

  }

  login(user: LoginModel) {

        this.http.post(this.url + 'login', user, this.httpOptions).subscribe(
          response => {

                if (response) {
                    console.log(response);
                    localStorage.setItem('token', response['token']);
                    localStorage.setItem('usuario', response['usuarioLoqueado']);
                    this.identity = localStorage.getItem('usuario');
                    console.log(this.identity['role']);
                    this.router.navigate(['/dashboard']);
                    }
          },
          error => {
            console.log(error);
          },
        );

  }

  getIdentity() {

      const identity = JSON.parse(localStorage.getItem('identity'));
      if (identity !== 'undefined') {
        this.identity = identity;
        } else {
      this.identity = null;
        }
      return this.identity;
    }


  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
        this.token = token;
        } else {
        this.token = null;
        }
    return this.token;
  }

  Autenticado() {
    return localStorage.getItem('token');
  }


  logout() {
          localStorage.clear();
          this.router.navigate(['/']);
  }

}



// .pipe(map(res => res.json()));

