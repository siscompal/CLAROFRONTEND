import { Component, OnInit } from '@angular/core';
import { Product} from '../../../../../models/product';
import { ProductService } from '../../../../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-pro',
  templateUrl: './crear-pro.component.html',
  styleUrls: ['./crear-pro.component.css']
})

export class CrearProComponent implements OnInit {

  public product: Product;
  public status: string;
  public registerForm: FormGroup;
  public tipos = [
    {id: 1, name: 'todoIncluido'},
    {id: 2, name: 'voz'},
    {id: 3, name: 'largaDistancia'},
    {id: 4, name: 'navegacion'},
    {id: 5, name: 'chat'},
    {id: 6, name: 'tv'},
    {id: 7, name: 'apps'},
    {id: 8, name: 'internetInalambrico'},
    {id: 9, name: 'minuteras'},
    {id: 10, name: 'recarga'}
  ];

constructor(
    private notificationService: NotificationService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CrearProComponent>,
    private formBuilder: FormBuilder) {

    this.product = new Product('', '', '', 0, 0, 0);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.product.name, [
        Validators.required,
        ]],
      precio: [this.product.precio, [
        Validators.required,
        Validators.min(0)
        ]],
      codigo: [this.product.codigo, [
        Validators.required,
        Validators.min(0)
        ]],
      incentivo: [this.product.incentivo, [
        Validators.required,
        Validators.min(0)
        ]],
      tipo: [this.product.tipo, [
        Validators.required,
        ]],
      descripcion: [this.product.descripcion, [
        Validators.required,
        ]],
    });
  }

  onSubmit() {

    this.productService.newProd(this.product).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.product = new Product('', '', '', 0, 0, 0);
              this.notificationService.success('Producto creado correctamente');
              this.dialogRef.close();
          } else {
            this.notificationService.warn('No se pudo crear el producto');
          }
        },
        error => {
          this.notificationService.warn(error.error.message);
        }
    );

  }

}
