import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../../services/user.service';
import { LoginModel } from '../../models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: LoginModel = new LoginModel();
  public loginForm: FormGroup;
  public error: string;
  public identity: any;
  public token: any;
  public usuario = {
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    cel: String,
    iden: String,
    user: String,
    efectyId: String,
    _id: String
  };

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {

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
    if (localStorage.getItem('token') != null) {
      let aux = JSON.parse(localStorage.getItem('usuario'));

      if (aux.role === 'ROLE_ADMIN') {
        this.router.navigate(['/dashboard/admin']);
      }

      if (aux.role === 'ROLE_ASESOR') {
        this.router.navigate(['/dashboard/asesor']);
      }

      if (aux.role === 'ROLE_CARGAS') {
        this.router.navigate(['/dashboard/cargas']);
      }

      if (aux.role === 'CLI_CLIENTE') {
        this.router.navigate(['/dashboard/cliente']);
      }

      if (aux.role === 'CLI_MAYORISTA') {
        this.router.navigate(['/dashboard/mayorista']);
      }

      if (aux.role === 'CLI_DISTRIBUIDOR') {
        this.router.navigate(['/dashboard/distribuidor']);
      }
    }




  }

  loginSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this.user.gettoken = true;
    this.userService.login(this.user).subscribe(
      response => {

            if (response) {
              // tslint:disable-next-line:no-string-literal
                const aux = response['usuarioLoqueado'];
                this.usuario.firstName = aux.name;
                this.usuario.lastName = aux.lastname;
                this.usuario.role = aux.role;
                this.usuario.cel = aux.cel;
                this.usuario.iden = aux.iden;
                this.usuario._id = aux._id;
                this.usuario.email = aux.email;
                this.usuario.user = aux.username;
                this.usuario.efectyId = aux.efectyId;

                // tslint:disable-next-line:no-string-literal
                localStorage.setItem('token', response['token']);
                localStorage.setItem('usuario', JSON.stringify(this.usuario));
                if (aux.role === 'ROLE_ADMIN') {
                  this.router.navigate(['/dashboard/admin']);
                }

                if (aux.role === 'ROLE_ASESOR') {
                  this.router.navigate(['/dashboard/asesor']);
                }

                if (aux.role === 'ROLE_CARGAS') {
                  this.router.navigate(['/dashboard/cargas']);
                }

                if (aux.role === 'CLI_CLIENTE') {
                  this.router.navigate(['/dashboard/cliente']);
                }

                if (aux.role === 'CLI_MAYORISTA') {
                  this.router.navigate(['/dashboard/mayorista']);
                }

                if (aux.role === 'CLI_DISTRIBUIDOR') {
                  this.router.navigate(['/dashboard/distribuidor']);
                }

              }
      },
      error => {
        this.error = error.error.message;
      },
    );


  }

}
