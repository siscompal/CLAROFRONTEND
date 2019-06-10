import { Component, OnInit } from '@angular/core';
import { Product} from '../../../../../models/product';
import { ProductService } from '../../../../../services/product.service';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';

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

constructor(
    private notificationService: NotificationService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CrearProComponent>) {

    this.product = new Product('', '', '', 0, 0, 0);
  }

  ngOnInit() {
  }

  onSubmit() {

    this.productService.newProd(this.product).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.product = new Product('', '', '', 0, 0, 0);
              this.notificationService.success(':: Producto creado correctamente');
              this.dialogRef.close();
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
