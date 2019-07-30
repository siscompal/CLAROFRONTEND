import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public UserLogged: any;
  public cupo: string;
  public status: boolean;
  public error: string;
  public filesToUpload: Array<File>;
  public images: Array<any>;
  public url: string;

  constructor(
          private userService: UserService,
          private imageService: ImageService,
          private notificationService: NotificationService,
  ) { }

  ngOnInit() {

    this.url = GLOBAL.url;
    this.imageService.getImages().subscribe(
      response => {
        if(response['images']){
          this.images = response['images'];
        }
        else {
          this.error = "No hay imagenes publicitarias";
        }   
      },
      error => {
        this.error = "No se pueden mostrar las imagenes";
      }
    );

    this.userService.getCupo().subscribe(
      response => {
        this.cupo = response['respuesta'];
        this.status = true;
      },

      err => {
        this.cupo = 'Saldo no disponible';
      }
    );
    this.UserLogged = this.userService.getIdentity();
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files; 
  }

  subirImagen() {
    this.imageService.uploadImage(this.filesToUpload)
      .then((result: any) => {
        this.notificationService.success("Imagen cargada");
        this.ngOnInit();
        },
        (error) => {
          this.notificationService.warn((JSON.parse(error)).message);
        }
      ); 
  }


  deleteImage(id: string) {
    this.imageService.deleteImage(id).subscribe(
      response => {
        if(response) {
          this.notificationService.success("Imagen eliminada");
          this.ngOnInit();
        }
      },
      error => {
        this.notificationService.warn("No se pudo eliminar la imagen");
      }
    )
  }
  

}
