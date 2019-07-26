import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {

  public id: string;
  public role: string;
  public pass: string;
  public registerForm: FormGroup;
  public changePass: FormGroup;
  public aux: any;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.aux = JSON.parse(localStorage.getItem('usuario'));
    this.id = this.aux._id;
    this.role = this.aux.role;

    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_ASESOR' || this.role === 'ROLE_CARGAS') {
      this.registerForm = this.formBuilder.group({
        name: [this.aux.name, [
          Validators.required
          ]],
        lastname: [this.aux.lastname, [
          Validators.required,
          ]],
        iden: [this.aux.iden, [
          Validators.required,
          ]],
        cel: [this.aux.cel, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
          ]],
        email: [this.aux.email, [
          Validators.required,
          Validators.email
          ]],
        dir: [this.aux.dir, [
          ]],
        city: [this.aux.city, [
          ]],
      });
    }

    if (this.role === 'CLI_CLIENTE' || this.role === 'CLI_DISTRIBUIDOR' || this.role === 'CLI_MAYORISTA') {
      this.registerForm = this.formBuilder.group({
        name: [this.aux.name, [
          Validators.required
          ]],
        lastname: [this.aux.lastname, [
          Validators.required,
          ]],
        iden: [this.aux.iden, [
          Validators.required,
          ]],
        cel: [this.aux.cel, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
          ]],
        email: [this.aux.email, [
          Validators.required,
          Validators.email
          ]],
        dir: [this.aux.dir, [
          Validators.required,
          ]],
        city: [this.aux.city, [
          Validators.required,
          ]],
      });
    }

    this.changePass = this.formBuilder.group({
      pass: [this.pass, [
        Validators.required
        ]],
    });

  }

  onSubmit() {
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_ASESOR' || this.role === 'ROLE_CARGAS') {
      this.userService.updateUsuario(this.aux, this.id).subscribe(
        response => {
          if (response) {
              this.notificationService.success('Sus datos se han actualizado correctamente');
              localStorage.removeItem('usuario');
              localStorage.setItem('usuario', JSON.stringify(this.aux));
          }
        },
        error => {
          this.notificationService.warn('No se pudo actualizar sus datos');
        }
      );
    }

    if (this.role === 'CLI_CLIENTE' || this.role === 'CLI_DISTRIBUIDOR' || this.role === 'CLI_MAYORISTA') {
      delete this.aux._id;
      console.log(this.aux);
      this.clientService.updateCliente(this.aux, this.id).subscribe(
        response => {
          if (response) {
              this.notificationService.success('Sus datos se han actualizado correctamente');
              localStorage.removeItem('usuario');
              localStorage.setItem('usuario', JSON.stringify(this.aux));
              
          }
        },
        error => {
          this.notificationService.warn('No se pudo actualizar sus datos');

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
          localStorage.clear();
          this.userService.logout();
        } 
      },
      error => {
        this.pass = "";
        this.notificationService.warn('No se ha podido actualizar la contraseña');
      }
    )
  }

}
