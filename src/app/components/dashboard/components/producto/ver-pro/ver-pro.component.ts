import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ver-pro',
  templateUrl: './ver-pro.component.html',
  styleUrls: ['./ver-pro.component.css']
})
export class VerProComponent implements OnInit {

  public product: Product;
  constructor(
    public dialogRef: MatDialogRef<VerProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private productService: ProductService
  ) {
    this.product = new Product('', '', '', 0, 0, 0);
   }

  ngOnInit() {
    this.productService.getproducto(this.data['id']).subscribe(
      response => {
        if(response){
          this.product = response['product'];
          if(this.product.incentivo == null){
            this.product.incentivo = 0;
          }
        }
      }
    )
  }

}
