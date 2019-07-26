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
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'clients', parametros, headers );

  }


  getClientes() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'clients', headers);
  }


  deleteCliente(id: any) {
    this.token = localStorage.getItem('token');
    const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.delete(this.url + 'client/'  + id, headers);
  }

  signUp(newClient: any) {
    const parametros = JSON.stringify(newClient);
    this.token = localStorage.getItem('token');
    const headers = {headers: new HttpHeaders({'Content-type': 'application/json'})};
    return this.http.post(this.url + 'register', parametros, headers );
  }

  getCliente(id: any){
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'client/' + id, headers);
  }

  updateCliente(cliente: any, id: any){
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.put(this.url + 'client/' + id, cliente, headers);
  }

  asignarSaldo(id: any, value: any, obser: string) {
    this.token = localStorage.getItem('token');
    const parametros = {
      valor: value,
      obs: obser
    };
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.put(this.url + 'asignar/' + id, parametros, headers);
  }

  debitarSaldo(id: any, value: any, obser: string) {
    this.token = localStorage.getItem('token');
    const parametros = {
      valor: value,
      obs: obser
    };
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.put(this.url + 'debitar/' + id, parametros, headers);
  }

  getRecargas() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'misRecargas', headers);
  }

  getRepartos() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'misRepartos', headers);
  }

  getProductos(tipo: string) {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'products/' + tipo, headers);
  }

  getMisClientes() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'myclients', headers);
  }

   // mayoristas y distribuidores que asignan o debitan
  getMovRepartos() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'movRepartos', headers);
  }

  getMyInfo() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'myInfo', headers);
  }

}


