import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
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

  email = new FormControl('', [Validators.required, Validators.email]);
  public user: User;
  public status: string;
  public options2 = [
    {id: 1, name: 'ROLE_ASESOR'},
    {id: 2, name: 'ROLE_CARGAS'}
  ];
  public selected2 = this.options2[1].id;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CrearUsuComponent>) {
    this.user = new User('', '', '', '', '', '', '', '');

  }

  ngOnInit() {
    console.log();
  }

  onSubmit() {

    this.userService.newUser(this.user).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.user = new User('', '', '', '', '', '', '', '');
              this.notificationService.success(':: Usuario creado correctamente');
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

  getErrorMessage() {
    return this.email.hasError('required') ? 'Campo obligatorio' :
        this.email.hasError('email') ? 'Email invalido' :
            '';
  }

}
