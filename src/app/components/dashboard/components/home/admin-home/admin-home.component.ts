import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public UserLogged: any;
  public cupo: String;
  public status: Boolean;
  constructor(
          private userService: UserService
  ) { }

  ngOnInit() {
    /*this.userService.getCupo().subscribe(
      response => {
        this.cupo = response['respuesta'];
        this.status = true;
      },

      err => {
        this.cupo = "Saldo no disponible";
        console.log(err);
      }
    );*/
    this.UserLogged = this.userService.getIdentity();
  }

}
