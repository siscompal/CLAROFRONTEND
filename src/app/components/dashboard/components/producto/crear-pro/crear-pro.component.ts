import { Component, OnInit } from '@angular/core';
import { Product} from '../../../../../models/product';
import { ProductService } from '../../../../../services/product.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-crear-pro',
  templateUrl: './crear-pro.component.html',
  styleUrls: ['./crear-pro.component.css']
})

export class CrearProComponent implements OnInit {

  public product: Product;
  public status: string;

  public tipos = [
    {id: 1, name: 'Todo incluido'},
    {id: 2, name: 'Minutos'},
    {id: 3, name: 'GB'},
    {id: 4, name: 'Apps'}
  ];


constructor( private productService: ProductService) {

   this.product = new Product('', '', '', 0, 0, 0);
  }

  ngOnInit() {
  }

  onSubmit() {

    this.productService.register(this.product).subscribe(
        response => {
          if ( response ) {
              console.log('success register', response);
              alert('Registro exitoso');
              this.status = 'success';
              this.product = new Product('', '', '', 0, 0, 0 );
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
