import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { LoginModel } from '../models/login';



@Injectable ()

export class UserService {
    public url: string;
    private httpOptions: any;
    public token: string;


    constructor(private http: HttpClient, private router: Router) {
            this.url = GLOBAL.url;
            this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    }

    register(newUser) {
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
                    localStorage.setItem('token', response['token']);
                    this.router.navigate(['/dashboard']);
                    }
          },
          error => {
            console.log(error);
          },
        );

    }

  /*  loginUser(loginUser, gettoken = null) {
        if (gettoken != null) {
          loginUser.gettoken = gettoken;
          }
        const parametros = JSON.stringify(loginUser);
        const headers = { headers: new HttpHeaders({'Content-type': 'application/json'})};
        return this.http.post(this.url + 'login', parametros, headers);
    }

*/
    Autenticado() {
        return localStorage.getItem('token');
    }



    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
      }






}



// .pipe(map(res => res.json()));

