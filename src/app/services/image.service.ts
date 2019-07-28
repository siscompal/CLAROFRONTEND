import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable ()

export class ImageService {
    public url: string;
    public token: string;

    constructor(private http: HttpClient) {
    this.url = GLOBAL.url;

    }

    uploadImage(files: Array<File>) {

        return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', GLOBAL.url+"image", true);
			xhr.send(formData);
		});
	}
	
	getImages() {
		this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.get(this.url + 'images', headers );
	}

	getImage(imagen: string) {
		this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({Authorization: this.token})};
        return this.http.get(this.url + 'image/'+ imagen, headers );
	}

	deleteImage(id: string) {
		this.token = localStorage.getItem('token');
        const headers = {headers: new HttpHeaders({'Content-type': 'application/json', Authorization: this.token})};
        return this.http.delete(this.url + 'image/'+ id, headers );
	}


}
