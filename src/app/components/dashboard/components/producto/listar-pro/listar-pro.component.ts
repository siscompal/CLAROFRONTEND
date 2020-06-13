import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from 'src/app/models/product';
import { CrearProComponent } from '../crear-pro/crear-pro.component';
import { VerProComponent } from '../ver-pro/ver-pro.component';
import { EditarProComponent } from '../editar-pro/editar-pro.component';

@Component({
  selector: 'app-listar-pro',
  templateUrl: './listar-pro.component.html',
  styleUrls: ['./listar-pro.component.css']
})
export class ListarProComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'precio', 'codigo', 'incentivo', 'acciones'];
  public searchKey: string;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.productService.getProductos().subscribe(
      list => {
        const array = list['products'];
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(CrearProComponent, dialogConfig);
  }

  verProducto(id: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height='100%';
    dialogConfig.data = {id: id}; 
    this.dialog.open(VerProComponent, dialogConfig);
  }

  onEdit(producto: Product, id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height='100%';
    dialogConfig.data = {producto: producto, id: id}; 
    this.dialog.open(EditarProComponent, dialogConfig);
  }

  onDelete(id: any){
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productService.deleteProducto(id).subscribe(
        Response => {
          this.notificationService.success('Producto eliminado');
        }
      );
    }
  }

}
