import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../../models/user';
import { GLOBAL } from '../../../../../services/global';
import { UserService } from '../../../../../services/user.service';


@Component({
  selector: 'app-crear-usu',
  templateUrl: './crear-usu.component.html',
  styleUrls: ['./crear-usu.component.css'],
  providers: [UserService]
})
export class CrearUsuComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  public user: User;
  public status: string;

  constructor(
   // private route: ActivatedRoute,
   // private router: Router,
    private userService: UserService
  ) {
    this.user = new User('', '', '', '', '', '', '', '', '');

  }

  ngOnInit() {
    console.log();
  }

  onSubmit() {

    this.userService.register(this.user).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.user = new User('', '', '', '', '', '', '', '', '');
          } else {
            this.status = 'error';
          }
        },
        error => {
          console.log(error);
        }
    );

  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Campo obligatorio' :
        this.email.hasError('email') ? 'Email invalido' :
            '';
  }

}
