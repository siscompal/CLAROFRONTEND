import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Router} from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';



@Injectable ()

export class UsuariosService {
    public url: string;
    public user = User;
    public headers: any;
    public token: string;

    constructor(private http: HttpClient, private router: Router, private userService: UserService) {
        this.token = this.userService.getToken();
        this.headers = { headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        this.url = GLOBAL.url;
    }
    getUsuarios() {
        return this.http.get(this.url + 'users/usuarios', this.headers);
    }


}


