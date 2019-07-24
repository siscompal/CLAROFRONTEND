import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from '../../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {
  
  public pass: string;
  public id: string;
  public changePass: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CambiarPassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.data.id;

    this.changePass = this.formBuilder.group({
      pass: [this.pass, [
        Validators.required
        ]]
    });

  }

  onChange() {
    this.userService.changePass(this.id, this.pass).subscribe(
        response => {
          if ( response ) {
              this.notificationService.success('Contraseña actualizada correctamente');
              this.dialogRef.close();
          } 
        },
        error => {
          this.notificationService.warn('No se pudo actualizar la contraseña');
          this.dialogRef.close();
        }
    );

  }

}
