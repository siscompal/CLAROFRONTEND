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
  public status: String;
  constructor(
    public dialogRef: MatDialogRef<EditarUsuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private notificationService: NotificationService,
    private userService: UserService) { 
      this.user = new User('', '', '', '', '', '', '', '');
    }

  ngOnInit() {
    this.user = this.data['usuario'];
  }

  onSubmit() {

    this.userService.updateUsuario(this.user, this.data['id']).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.user = new User('', '', '', '', '', '', '', '');
              this.notificationService.success(':: Usuario actualizado correctamente');
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
