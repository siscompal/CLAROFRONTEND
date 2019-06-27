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

}
