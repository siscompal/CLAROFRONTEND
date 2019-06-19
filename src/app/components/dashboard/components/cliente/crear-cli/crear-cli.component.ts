import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../../models/client';
import { ClientService } from '../../../../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-cli',
  templateUrl: './crear-cli.component.html',
  styleUrls: ['./crear-cli.component.css']
})
export class CrearCliComponent implements OnInit {
  public client: Client;
  public status: string;
  public role: any;
  public selected2: any;
  public userLogged: any;
  public registerForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<CrearCliComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.client = new Client('', '', '', '', '', '', '', '', '', '', null);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.client.name, [
        Validators.required,
        ]],
      lastname: [this.client.lastname, [
        Validators.required,
        ]],
      iden: [this.client.iden, [
        Validators.required,
        ]],
      porcentaje: [this.client.porcentaje, [
        Validators.required,
        Validators.min(0),
        Validators.max(10)
        ]],
      username: [this.client.username, [
        Validators.required,
        ]],
      password: [this.client.password, [
        Validators.required,
        ]],
      cel: [this.client.cel, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ]],
      city: [this.client.city, [
        Validators.required,
        ]],
      dir: [this.client.dir, [
        Validators.required,
        ]],
      email: [this.client.email, [
        Validators.required,
        Validators.email
        ]],
      role: [this.client.role, [
        Validators.required,
        ]],
    });

    this.userLogged = this.userService.getIdentity();
    if (this.userLogged['role'] === 'CLI_MAYORISTA') {
      this.role = [
        { id: 2, name: 'CLI_DISTRIBUIDOR' },
        { id: 3, name: 'CLI_CLIENTE' }
      ];
      this.selected2 = this.role[2].id;
    } else if (this.userLogged['role'] === 'CLI_DISTRIBUIDOR') {
      this.role = [{ id: 3, name: 'CLI_CLIENTE' }];
      this.selected2 = this.role[3].id;
    } else {
      this.role = [
        { id: 1, name: 'CLI_MAYORISTA' },
        { id: 2, name: 'CLI_DISTRIBUIDOR' },
        { id: 3, name: 'CLI_CLIENTE' }
      ];
      this.selected2 = this.role[1].id;
    }
  }

  onSubmit() {
    this.clientService.register(this.client).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.client = new Client('', '', '', '', '', '', '', '', '', '', null);
          this.notificationService.success('Cliente creado correctamente');
          this.dialogRef.close();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
