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

    recarga(num: any, valor: any, bols: string) {
        console.log(bols);
        const parametros = {
            producto: 1,
            numero: num,
            monto: valor,
            bolsa: bols};
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'recargas', parametros, headers);
    }

    paquete(num: any, bols: string) {
        

    }

}
