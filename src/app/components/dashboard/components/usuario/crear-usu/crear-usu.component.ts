import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../../models/user';
import { UserService } from '../../../../../services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-crear-usu',
  templateUrl: './crear-usu.component.html',
  styleUrls: ['./crear-usu.component.css'],
  providers: [UserService]
})
export class CrearUsuComponent implements OnInit {

  public user: User;
  public status: string;
  public options2 = [
    {id: 1, name: 'ROLE_ASESOR'},
    {id: 2, name: 'ROLE_CARGAS'},
    {id: 3, name: 'ROLE_ADMIN'}
  ];
  public selected2 = this.options2[1].id;
  public registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CrearUsuComponent>,
    private formBuilder: FormBuilder) {
    this.user = new User('', '', '', '', '', '', '', '');

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
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
      password: [this.user.password, [
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
      role: [this.user.role, [
        Validators.required,
        ]],
    });
  }

  onSubmit() {

    this.userService.newUser(this.user).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.user = new User('', '', '', '', '', '', '', '');
              this.notificationService.success('Usuario creado correctamente');
              this.dialogRef.close();
          } 
        },
        error => {
          this.notificationService.warn('No se ha podido crear el usuario');
        }
    );

  }


}
