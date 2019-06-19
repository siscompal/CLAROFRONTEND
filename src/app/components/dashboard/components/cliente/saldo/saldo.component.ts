import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SaldoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  asignar(valor: any, obs: string) {
    console.log(this.data);
    this.clientService.asignarSaldo(this.data['id'], valor, obs).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.notificationService.success('Saldo asignado correctamente');
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  debitar(valor: any, obs: string) {
    console.log(this.data);
    this.clientService.debitarSaldo(this.data['id'], valor, obs).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.notificationService.success('Saldo debitado correctamente');
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
