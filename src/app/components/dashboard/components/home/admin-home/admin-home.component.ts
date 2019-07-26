import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public UserLogged: any;
  public cupo: string;
  public status: boolean;
  public imagen: File;
  constructor(
          private userService: UserService
  ) { }

  ngOnInit() {
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
    this.imagen = fileInput.target.files.FileList; 
    console.log(this.imagen);
  }

  subirImagen() {

  }

}
