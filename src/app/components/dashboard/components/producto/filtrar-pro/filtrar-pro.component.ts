import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ClientService } from '../../../../../services/client.service';
import { RecargaService } from '../../../../../services/recarga.service';

@Component({
  selector: 'app-filtrar-pro',
  templateUrl: './filtrar-pro.component.html',
  styleUrls: ['./filtrar-pro.component.css']
})
export class FiltrarProComponent implements OnInit {

  public tipo: string;
  public operador: string;
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'descripcion', 'incentivo', 'acciones'];
  public bolsa: string;
  public bolsas: string[] = ['saldo', 'comision', 'incentivo'];
  public numero: string;
  public titulo: string;
  public recargaForm: FormGroup;

  constructor(
    private recargaService: RecargaService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FiltrarProComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.tipo = this.data['tipo_pro'];
    this.operador = this.data['operador'];
    this.recargaForm = this.formBuilder.group({
      numero: [this.numero, [
        Validators.required,
      ]],
      radio: [this.bolsa, [
        Validators.required
      ]]
    });
    if (this.operador === 'claro') {
      if (this.tipo === 'navegacion') {
        this.titulo = 'Paquetes de navegación claro';
        this.clientService.getProductos('navegacion').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'voz') {
        this.titulo = 'Paquetes de voz claro';
        this.clientService.getProductos('voz').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'todoIncluido') {
        this.titulo = 'Paquetes todo incluido claro';
        this.clientService.getProductos('todoIncluido').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'largaDistancia') {
        this.titulo = 'Paquetes de larga distancia claro';
        this.clientService.getProductos('largaDistancia').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'chat') {
        this.titulo = 'Paquetes de chat claro';
        this.clientService.getProductos('chat').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'apps') {
        this.titulo = 'Paquetes de aplicaciones claro';
        this.clientService.getProductos('apps').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'tv') {
        this.titulo = 'Paquetes de TV prepago claro';
        this.clientService.getProductos('tv').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else if (this.tipo === 'internetInalambrico') {
        this.titulo = 'Paquetes de internet inalámbrico claro';
        this.clientService.getProductos('internetInalambrico').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      } else {
        this.titulo = 'Minuteras claro';
        this.clientService.getProductos('minuteras').subscribe(
          list => {
            const array = list['data'];
            this.listData = new MatTableDataSource(array);
          }
        );
      }
    }
  }

  onNumClear() {
    this.numero = '';
  }

  venderPaquete(codigo: string, precio: number) {
    if (this.numero == null) {
      this.notificationService.warn('Ingrese los valores para realizar la recarga');
    } else {
      this.recargaService.recarga(this.numero, precio, codigo, this.bolsa).subscribe(
        () => {
          this.numero = null;
          this.notificationService.success('Recarga exitosa');
          this.dialogRef.close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
