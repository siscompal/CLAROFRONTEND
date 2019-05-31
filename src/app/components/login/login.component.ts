import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../../services/user.service';
import { LoginModel } from '../../models/login';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: LoginModel = new LoginModel();
  public loginForm: FormGroup;
 //  public user: User;
  public identity;
  public token;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    // this.user = new User ('', '', '', '', '', '', '', '', '', );
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.user.username, [
        Validators.required,

      ]],
      password: [this.user.password, [
        Validators.required,
      ]]
    });
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }




  }

  loginSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this.user.gettoken = true;
    this.userService.login(this.user);

  }

  /* logSubmit() {

    // loguear al usuario y obtener sus datos
    this.userService.loginUser(this.user).subscribe(
      response => {
          this.identity = this.user;

          if (!this.identity || this.identity.id) {
            alert('no se ha logueado bien');
          } else {

            console.log (this.token);
            // conseguir el token
            this.userService.loginUser(this.user, true).subscribe(

                response => {
                    this.token = this.token;
                    if (this.token.length <= 0 ) {
                      alert('El token no se ha generado');
                    } else {
                      // mostrar el token
                      console.log (this.token);
                    }
                },
                 error => {
                    console.log (error);
                }
            );
          }
      },

    );

  }

*/








}
