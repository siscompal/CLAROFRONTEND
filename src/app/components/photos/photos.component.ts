import { Component, OnInit } from '@angular/core';
import {PhotosService } from '../../services/photos.service';
import { Photo } from 'src/app/models/Photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

photos: Photo[] = [];

  constructor(public photosService: PhotosService) {

   }
  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      this.photosService.getPhotos()
        .subscribe(
          photos => {
            console.log(photos);
            this.photos = photos;
          },
          error => console.log(error)
        );

  }
  mostrar(): void {
    alert('funciona');
  }
}
