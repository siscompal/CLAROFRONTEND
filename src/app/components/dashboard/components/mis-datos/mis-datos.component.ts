import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public id: String;
  public role: String;
  public user = {
    name: String,
    lastname: String,
    role: String,
    email: String,
    cel: String,
    iden: String,
    username: String,
  };

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit() {

    const aux = JSON.parse(localStorage.getItem('usuario'));
    this.id = aux._id;
    this.role = aux.role;
    this.user.name = aux.firstName;
    this.user.lastname = aux.lastName;
    this.user.username = aux.user;
    this.user.email = aux.mail;
    this.user.cel = aux.phone;

  }

  
  onSubmit() {

  }

}
