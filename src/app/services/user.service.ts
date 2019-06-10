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
    public identity;
    public user = User;


  constructor(private http: HttpClient, private router: Router) {
      this.url = GLOBAL.url;
      this.httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  }

  login(user: LoginModel) {

        this.http.post(this.url + 'login', user, this.httpOptions).subscribe(
          response => {

                if (response) {
                    console.log(response);
                    localStorage.setItem('token', response['token']);
                    localStorage.setItem('usuario', response['usuarioLoqueado']);
                    this.identity = localStorage.getItem('usuario');
                    console.log(this.identity['role']);
                    this.router.navigate(['/dashboard']);
                    }
          },
          error => {
            console.log(error);
          },
        );

  }

  getIdentity() {

      const identity = JSON.parse(localStorage.getItem('identity'));
      if (identity !== 'undefined') {
        this.identity = identity;
        } else {
      this.identity = null;
        }
      return this.identity;
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
  getUsuario(id: any){
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.get(this.url + 'user/' + id, headers);
  }

  updateUsuario(usuario: User, id: any){
    this.token = localStorage.getItem('token');
    const headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
    return this.http.put(this.url + 'users/' + id, usuario, headers);
  }

}



// .pipe(map(res => res.json()));

