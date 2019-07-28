import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  public images: Array<any>;
  public error: string;
  public url: string;
  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit() {
    
    this.imageService.getImages().subscribe(
      response => {

        if(response['images']){
          this.images = response['images'];
          if(this.images.length == 0) {
            this.error = "No hay imagenes publicitarias";
          }
        }
      },
      error => {
        this.error = "No se pueden mostrar las imagenes";
      }
      
    );
    this.url = GLOBAL.url;
  }


}
