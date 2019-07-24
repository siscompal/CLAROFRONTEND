import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { User } from 'src/app/models/user';
import { Client } from '../../../../models/client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public id: string;
  public role: string;
  public user: User;
  public pass: string;
  public registerForm: FormGroup;
  public changePass: FormGroup;
  public usuario = {
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    cel: String,
    iden: String,
    user: String,
    _id: String
  };

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.user = new User('', '', '', '', '', '', '', '');
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required
        ]],
      lastname: [this.user.lastname, [
        Validators.required,
        ]],
      iden: [this.user.iden, [
        Validators.required,
        ]],
      username: [this.user.username, [
        Validators.required,
        ]],
      cel: [this.user.cel, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
        ]],

    });

    this.changePass = this.formBuilder.group({
      pass: [this.pass, [
        Validators.required
        ]],
    });

    const aux = JSON.parse(localStorage.getItem('usuario'));
    this.id = aux._id;
    this.role = aux.role;
    this.user.name = aux.firstName;
    this.user.lastname = aux.lastName;
    this.user.username = aux.user;
    this.user.email = aux.email;
    this.user.cel = aux.cel;
    this.user.iden = aux.iden;
  }

  onSubmit() {
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_ASESOR' || this.role === 'ROLE_CARGAS') {
      this.userService.updateUsuario(this.user, this.id).subscribe(
        response => {
          if (response) {
              this.notificationService.success('Sus datos se han actualizado correctamente');
              localStorage.removeItem('usuario');
          }
        },
        error => {
          this.notificationService.warn('No se pudo actualizar sus datos');
        }
      );
    }

    if (this.role === 'CLI_CLIENTE' || this.role === 'CLI_DISTRIBUIDOR' || this.role === 'CLI_MAYORISTA') {
      let client: Client;
      client.name = this.user.name;
      client.lastname = this.user.lastname;
      client.iden = this.user.iden;
      client.username = this.user.username;
      client.cel = this.user.cel;
      client.email = this.user.email;
      this.clientService.updateCliente(client, this.id).subscribe(
        response => {
          if (response) {
              this.notificationService.success('Sus datos se han actualizado correctamente');
              this.userService.logout();
              
          }
        },
        error => {
          this.notificationService.warn('No se pudo actualizar sus datos');
          this.userService.logout();
        }
      );
    }
    

  }

  onChange() {
    this.userService.changePass(this.id, this.pass).subscribe(
      response => {
        if (response) {
          this.pass = "";
          this.notificationService.success('Su contraseña se ha actualizado correctamente');
        } 
      },
      error => {
        this.pass = "";
        this.notificationService.warn('No se ha podido actualizar la contraseña');
      }
    )
  }

}
