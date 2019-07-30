import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-ase-home',
  templateUrl: './ase-home.component.html',
  styleUrls: ['./ase-home.component.css']
})
export class AseHomeComponent implements OnInit {

  public registerForm: FormGroup;
  public num: string;
  public iccid: string;
  public error: string;
  public filesToUpload: Array<File>;
  public images: Array<any>;
  public url: string;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      num: [this.num, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
        ]],
      iccid: [this.iccid, [
        Validators.required,
        Validators.min(0)
        ]]
    });

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
        } else {
          this.notificationService.warn("No se pudo eliminar la imagen");
        }
      },
      error => {
        this.notificationService.warn("No se pudo eliminar la imagen");
      }
    )
  }

}
