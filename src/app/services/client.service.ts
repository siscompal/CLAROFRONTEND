import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { Client } from '../models/client';



@Injectable ()

export class ClientService {
    public url: string;
    public token: string;
    public client = Client;


    constructor(private http: HttpClient, private router: Router) {
            this.url = GLOBAL.url;
           // this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

}

  register(newClient: any) {
        const parametros = JSON.stringify(newClient);
        console.log(parametros);
        this.token = localStorage.getItem('token');
        const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'clients', parametros, headers );

  }


  getClientes() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'clients', headers);
  }


  deleteCliente(id: any) {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.delete(this.url + 'clients/'  + id, headers);
  }

}

// .pipe(map(res => res.json()));
