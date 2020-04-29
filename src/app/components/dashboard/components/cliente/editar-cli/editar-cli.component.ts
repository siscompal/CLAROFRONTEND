import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Client } from '../../../../../models/client';
import { ClientService } from '../../../../../services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editar-cli',
  templateUrl: './editar-cli.component.html',
  styleUrls: ['./editar-cli.component.css']
})
export class EditarCliComponent implements OnInit {

  public client: Client;
  public status: String;
  constructor(
    public dialogRef: MatDialogRef<EditarCliComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientService: ClientService,
    private notificationService: NotificationService) {
      this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
  }

  ngOnInit() {
    this.client = this.data['cliente'];
  }

  onSubmit() {

    this.clientService.updateCliente(this.client, this.data['id']).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
              this.notificationService.success('Cliente actualizado correctamente');
              this.dialogRef.close();
          }
        },
        error => {
          this.notificationService.warn('No se ha podido actualizar la información');
          this.dialogRef.close();
        }
    );

  }

}
