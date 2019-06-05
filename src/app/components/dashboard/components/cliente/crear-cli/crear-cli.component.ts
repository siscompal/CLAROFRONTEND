import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Client } from '../../../../../models/client';
import { ClientService } from '../../../../../services/client.service';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cli',
  templateUrl: './crear-cli.component.html',
  styleUrls: ['./crear-cli.component.css']
})
export class CrearCliComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  public client: Client;
  public status: string;
  public role = [
    {id: 1, name: 'CLI_MAYORISTA'},
    {id: 2, name: 'CLI_DISTRIBUIDOR'},
    {id: 3, name: 'CLI_CLIENTE'},
  ];
  public selected2 = this.role[1].id;
  
  constructor(
    private notificationService: NotificationService,
    private clientService: ClientService, 
    public dialogRef: MatDialogRef<CrearCliComponent>,
    private router:Router) {

    this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);

  }

  ngOnInit() {
  }

  onSubmit() {

    this.clientService.register(this.client).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
              this.notificationService.success(':: Cliente creado correctamente');
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
