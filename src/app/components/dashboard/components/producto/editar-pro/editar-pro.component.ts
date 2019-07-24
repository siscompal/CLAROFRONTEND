import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-editar-pro',
  templateUrl: './editar-pro.component.html',
  styleUrls: ['./editar-pro.component.css']
})
export class EditarProComponent implements OnInit {

  public product: Product;
  public status: String;
  constructor(
    public dialogRef: MatDialogRef<EditarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private notificationService: NotificationService,
    private productService: ProductService
  ) { 
    this.product = new Product('', '', '', 0, 0, 0);
  }

  ngOnInit() {
    this.product = this.data['producto'];
  }

  onSubmit() {

    this.productService.updateProducto(this.product, this.data['id']).subscribe(
        response => {
          if ( response ) {
              this.status = 'success';
              this.product = new Product('', '', '', 0, 0, 0);
              this.notificationService.success('Producto actualizado correctamente');
              this.dialogRef.close();
          }
        },
        error => {
          this.notificationService.warn("No se ha podido actualizar el producto");
        }
    );

  }

}
