import { Component, OnInit } from '@angular/core';
import { RecargaService } from '../../../../../services/recarga.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ClientService } from '../../../../../services/client.service';
import { FiltrarProComponent } from '../../producto/filtrar-pro/filtrar-pro.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CliHomeComponent implements OnInit {


  public valor: number;
  public numero: string;
  public btn1: Array<any> = [1000, 2000, 3000, 5000];
  public btn2: Array<any> = [10000, 20000, 30000, 50000];
  public bolsa: string;
  public bolsas: string[] = ['saldo', 'comision', 'incentivo'];
  public megas: any;
  public todo: any;
  public minutos: any;
  public aplicaciones: any;

  public recargaForm: FormGroup;
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
    this.valor = null;
    this.numero = null;
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
          this.notificationService.success('Recarga realizada con éxito');
        },
        err => {
          console.log(err);
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
