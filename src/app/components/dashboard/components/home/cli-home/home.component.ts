import { Component, OnInit, ViewChild } from '@angular/core';
import { RecargaService } from '../../../../../services/recarga.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../../../services/client.service';
import { FiltrarProComponent } from '../../producto/filtrar-pro/filtrar-pro.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CliHomeComponent implements OnInit {


  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'hora', 'numero', 'monto', 'estado'];

  public valor: number;
  public numero: string;
  public btn1: Array<any> = [
    {nombre: "1.000", valor: 1000},
    {nombre: "2.000", valor: 2000},
    {nombre: "3.000", valor: 3000},
    {nombre: "5.000", valor: 5000}
  ];
  public btn2: Array<any> = [
    {nombre: "10.000", valor: 10000},
    {nombre: "20.000", valor: 20000},
    {nombre: "30.000", valor: 30000},
    {nombre: "50.000", valor: 50000}
  ];
  public bolsa: string;
  public bolsas: string[] = ['saldo', 'comision', 'incentivo'];
  public megas: any;
  public todo: any;
  public minutos: any;
  public aplicaciones: any;
  public saldos: Array<number> = [0,0,0];
  public n_saldos: Array<string> = ['Saldo', 'Comisión', 'Incentivo'];
  public mapSaldos: any;
  public recargaForm: FormGroup;
  public origen: string;
  public destino: string;

  constructor(
    private formBuilder: FormBuilder,
    private recargaService: RecargaService,
    public notificationService: NotificationService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.recargaForm = this.formBuilder.group({
      numero: [this.numero, [
        Validators.required,
      ]],
      valor: [this.valor, [
        Validators.required,
        Validators.min(1000)
      ]],
      radio: [this.bolsa, [
        Validators.required
      ]]
    });

    this.clientService.getMyInfo().subscribe(
      response => {
        let aux = response['cliente'];
        this.saldos[0] = aux.saldo_actual;
        this.saldos[1] = aux.comision_actual;
        this.saldos[2] = aux.incentivo_actual;
        this.mapSaldos = this.saldos.map((v, i) => [v, this.n_saldos[i]]);
      }
    );

    this.recargaService.ultimasRecargas().subscribe(
      list => {
        if(list['message']){
          const array = list['message'];
          this.listData = new MatTableDataSource(array);
        }
      },
    )

    this.valor = null;
    this.numero = null;


  }
  
  onSubmit(){
    if(this.origen === this.destino) {
      this.notificationService.warn("La bolsa de origen y destino no pueden ser iguales");
    } else {
      this.clientService.pasarSaldo(this.origen, this.destino).subscribe(
        response => {
          if(response) {
            this.notificationService.success("Tranferencia exitosa");
            this.ngOnInit();
          }
        },

        error => {
          this.notificationService.warn(error.error.message);
          
        }
      )
    }
  }

  setValue(valor: any) {
    this.valor = valor;
  }

  recargar() {
    if (this.numero == null && this.valor == null && this.bolsa == null || !this.numero ||  !this.valor || !this.bolsa) {
      this.notificationService.warn('Ingrese los valores para realizar la recarga');
    } else {
      this.recargaService.recarga(this.numero, this.valor, '1', this.bolsa).subscribe(
        () => {
          this.valor = null;
          this.numero = null;
          this.notificationService.success('Recarga exitosa');
          this.ngOnInit();
        },
        err => {
          this.notificationService.warn('Recarga Fallida');
        }
      );
    }
  }

  Claro(tipo: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      tipo_pro: tipo,
      operador: 'claro'};
    this.dialog.open(FiltrarProComponent, dialogConfig);
  }
}
