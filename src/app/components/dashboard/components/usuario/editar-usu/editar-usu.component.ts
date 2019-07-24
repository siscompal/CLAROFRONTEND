import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { User } from '../../../../../models/user';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editar-usu',
  templateUrl: './editar-usu.component.html',
  styleUrls: ['./editar-usu.component.css']
})
export class EditarUsuComponent implements OnInit {

  public user: User;
  public status: string;
  constructor(
    public dialogRef: MatDialogRef<EditarUsuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private notificationService: NotificationService,
    private userService: UserService) {
      this.user = new User('', '', '', '', '', '', '', '');
    }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.user = this.data['usuario'];
  }

  onSubmit() {

    // tslint:disable-next-line: no-string-literal
    this.userService.updateUsuario(this.user, this.data['id']).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.user = new User('', '', '', '', '', '', '', '');
              this.notificationService.success('Usuario actualizado correctamente');
              this.dialogRef.close();
          }
        },
        error => {
          this.notificationService.warn('No se pudo actualizar el usuario');
        }
    );

  }

}
