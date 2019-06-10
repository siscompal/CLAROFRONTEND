import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Product } from '../models/product';



@Injectable ()

export class ProductService {
    public url: string;
    public token: string;
    public product: Product;

    constructor(private http: HttpClient) {
    this.url = GLOBAL.url;

    }


    newProd(newProduct: any) {
        const parametros = JSON.stringify(newProduct);
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'products', parametros, headers );
    }

    getProductos(){
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.get(this.url + 'products', headers);
    }

    getproducto(id: any){
      this.token = localStorage.getItem('token');
      const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
      return this.http.get(this.url + 'product/' + id, headers);
    }

    deleteProducto(id: any) {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.delete(this.url + 'products/'  + id, headers);
      }

      updateProducto(producto: Product, id: any){
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.put(this.url + 'products/' + id, producto, headers);
      }

}
