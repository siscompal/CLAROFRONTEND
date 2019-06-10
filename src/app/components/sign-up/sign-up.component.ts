import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public client: Client;
  public status: String;

  constructor(
    private notificationService: NotificationService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
   }

  ngOnInit() {
  }

  onSubmit() {

    this.clientService.signUp(this.client).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
              this.notificationService.success(':: Cliente creado');
              let navigate = this.router.navigate(['']);
              setInterval(function(){ navigate }, 5000);

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
