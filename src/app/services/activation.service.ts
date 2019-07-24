import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Activation } from '../models/activation';



@Injectable ()

export class ActivationService {
    public url: string;
    public token: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    registro(activation: Activation) {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.post(this.url + 'sims', activation, headers);
    }

    getSims() {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.get(this.url + 'sims', headers);
    }

    updateSim(sim: Activation, id: string) {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.put(this.url + 'sim/' + id, sim, headers);
    }

    activateSim(sim: Object) {
        this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.put(this.url + 'activar', sim, headers);
    }

}
