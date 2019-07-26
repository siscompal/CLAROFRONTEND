import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable ()

export class ImageService {
    public url: string;
    public token: string;

    constructor(private http: HttpClient) {
    this.url = GLOBAL.url;

    }

    uploadImage(image: File) {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'products', image, headers );
    }


}
