import { Injectable } from '@angular/core';
// para poder hacer peticiones  http importo su modulo correspondiente
import { HttpClient } from '@angular/common/http';

import {Photo } from '../models/Photo';



@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) {

   }

    getPhotos() {
      return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos?_limit=5');
    }

}
