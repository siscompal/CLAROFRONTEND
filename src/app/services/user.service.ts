import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { LoginModel } from '../models/login';
import { User } from '../models/user';



@Injectable ()

export class UserService {
    public url: string;
    private httpOptions: any;
    public token: string;
    public identity: string;
    public user = User;
    public usuario = {
      firstName: String,
      lastName: String,
      role: String,
      saldo: String,
      comision: String,
      incentivo: String
    };

  constructor(private http: HttpClient, private router: Router) {
      this.url = GLOBAL.url;
      this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  }

  login(user: LoginModel) {

        this.http.post(this.url + 'login', user, this.httpOptions).subscribe(
          response => {

                if (response) {
                    const aux = response['usuarioLoqueado'];
                    this.usuario.firstName = aux['name'];
                    this.usuario.lastName = aux['lastname'];
                    this.usuario.role = aux['role'];
                    this.usuario.saldo = aux['saldo_actual'];
                    this.usuario.comision = aux['comision_actual'];
                    this.usuario.incentivo = aux['incentivo_actual'];

                    localStorage.setItem('token', response['token']);
                    localStorage.setItem('usuario', JSON.stringify(this.usuario));
                    if (aux['role'] === 'ROLE_ADMIN') {
                      this.router.navigate(['/dashboard/admin']);
                    }

                    if (aux['role'] === 'ROLE_ASESOR') {
                      this.router.navigate(['/dashboard/asesor']);
                    }

                    if (aux['role'] === 'ROLE_CARGAS') {
                      this.router.navigate(['/dashboard/cargas']);
                    }
                    if (aux['role'] === 'CLI_CLIENTE') {
                      this.router.navigate(['/dashboard/cliente']);
                    }

                  }
          },
          error => {
            console.log(error);
          },
        );

  }


  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
        this.token = token;
        } else {
        this.token = null;
        }
    return this.token;
  }

  getIdentity() {

    const identity = JSON.parse(localStorage.getItem('usuario'));
    if (identity !== 'undefined') {
      this.identity = identity;
      } else {
     this.identity = null;
      }
    return this.identity;
  }

  Autenticado() {
    return localStorage.getItem('token');
  }


  logout() {
          localStorage.clear();
          this.router.navigate(['/']);
  }

  getUsuarios() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'users', headers);
  }

  deleteUsuario(id: any) {
    this.token = localStorage.getItem('token');
    const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.delete(this.url + 'users/'  + id, headers);
  }

  newUser(newUser: any) {
    const parametros = JSON.stringify(newUser);
    this.token = localStorage.getItem('token');
    const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.post(this.url + 'users', parametros, headers );
  }
  getUsuario(id: any) {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'user/' + id, headers);
  }

  updateUsuario(usuario: User, id: any) {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.put(this.url + 'users/' + id, usuario, headers);
  }

  getCupo() {
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'balance' , headers);
  }

}



// .pipe(map(res => res.json()));

