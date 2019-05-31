import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../../../models/client';
import { GLOBAL } from '../../../../../services/global';
import { ClientService } from '../../../../../services/client.service';

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

  constructor(private clientService: ClientService) {

    this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);

  }

  ngOnInit() {
  }

  onSubmit() {

    this.clientService.register(this.client).subscribe(
        response => {
          if ( response ) {
              console.log('success register', response);
              this.status = 'success';
              this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
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
