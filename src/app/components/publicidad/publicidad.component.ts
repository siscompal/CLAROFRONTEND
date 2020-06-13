import { Component, OnInit, ViewChild  } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { GLOBAL } from '../../services/global';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  public images: Array<any>;
  public error: string;
  public url: string;
  public im:string;

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;


  constructor(
    private imageService: ImageService
  ) { }

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

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
  
    /* let i=0;
      setInterval(()=>{
        if(i>=this.images.length){
          i=0;
        }
        
        let imagen=this.images[i]
        this.im=this.url+"image/"+imagen['imagePath'];
        console.log(this.im);
        console.log(i)
        i++;
      },5000);
      console.log(this.im); */
    
    
  }


}
