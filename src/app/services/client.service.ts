import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { Client } from '../models/client';



@Injectable ()

export class ClientService {
    public url: string;
    private httpOptions: any;
    public token: string;
    public identity;
    public client = Client;


    constructor(private http: HttpClient, private router: Router) {
            this.url = GLOBAL.url;
           // this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

}

register(newClient) {
        const parametros = JSON.stringify(newClient);
        console.log(parametros);
        this.token = localStorage.getItem('token');
        const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'clients/register', parametros, headers );
          // .pipe(map(res => res.newUser()));

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


}

// .pipe(map(res => res.json()));
