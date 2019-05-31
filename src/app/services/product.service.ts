import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { Product } from '../models/product';



@Injectable ()

export class ProductService {
public url: string;
public token: string;
public product = Product;
public identity;


constructor(private http: HttpClient) {
 this.url = GLOBAL.url;

}


register(newProduct) {

    const parametros = JSON.stringify(newProduct);
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.post(this.url + 'products/register', parametros, headers );

}


}
