import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../../models/client';
import { ClientService } from '../../../../../services/client.service';
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
  public selected2:any;
  public userLogged: any;

  constructor(
    private notificationService: NotificationService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<CrearCliComponent>,
    private userService: UserService) {

    this.client = new Client('', '', '', '', '', '', '', '', '', '', null);

  }

  ngOnInit() {
    this.userLogged = this.userService.getIdentity();
    if(this.userLogged['role'] == "CLI_MAYORISTA") {
      this.role = [
        {id: 2, name: 'CLI_DISTRIBUIDOR'},
        {id: 3, name: 'CLI_CLIENTE'},
        
      ];
      this.selected2 = this.role[2].id;
    }

    else if(this.userLogged['role'] == "CLI_DISTRIBUIDOR") {
      this.role = [
        {id: 3, name: 'CLI_CLIENTE'},
      ];
      this.selected2 = this.role[3].id;
    }

    else {
      this.role = [
        {id: 1, name: 'CLI_MAYORISTA'},
        {id: 2, name: 'CLI_DISTRIBUIDOR'},
        {id: 3, name: 'CLI_CLIENTE'},
      ];
      this.selected2 = this.role[1].id;
    }
  }

  onSubmit() {

    this.clientService.register(this.client).subscribe(
        response => {
          if ( response ) {
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
