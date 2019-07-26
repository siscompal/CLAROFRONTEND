import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public registerForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.client.name, [
        Validators.required,
        ]],
      lastname: [this.client.lastname, [
        Validators.required,
        ]],
      iden: [this.client.iden, [
        Validators.required,
        ]],
      username: [this.client.username, [
        Validators.required,
        ]],
      password: [this.client.password, [
        Validators.required,
        ]],
      cel: [this.client.cel, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ]],
      city: [this.client.city, [
        Validators.required,
        ]],
      dir: [this.client.dir, [
        Validators.required,
        ]],
      email: [this.client.email, [
        Validators.required,
        Validators.email
        ]],
    });
  }

  onSubmit() {

    this.clientService.signUp(this.client).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
              this.notificationService.success('Cliente creado');
              let navigate = this.router.navigate(['']);
              setInterval(function(){ navigate }, 5000);

          }
        },
        error => {
          this.notificationService.warn(error.error.message);
        }
    );

  }

}
