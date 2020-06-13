import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';



@Injectable ()

export class RecargaService {
    public url: string;
    public token: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    recarga(num: string, valor: number, codigo: string, bols: string) {
        const parametros = {
            producto: codigo,
            numero: num,
            monto: valor,
            bolsa: bols};
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'recargas', parametros, headers);

    }

    ultimasRecargas() {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.get(this.url + 'last', headers);
    }

}
export interface RecargaCliente{
  
    fec_cre?:any;
    monto?:number;
    numero?:string;
    producto?:string;
    client?:string
    respuesta?:string;
  

}
