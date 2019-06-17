import { Component, OnInit } from '@angular/core';
import { RecargaService } from '../../../../../services/recarga.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../../../services/client.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CliHomeComponent implements OnInit {


  public valor: Number;
  public numero: String;
  public btn1: Array<any> = [1000, 2000, 3000, 5000];
  public btn2: Array<any> = [10000, 20000, 30000, 50000];
  public bolsa: String;
  public bolsas: String[] = ['saldo', 'comision', 'incentivo'];
  public megas: any;
  public todo: any;
  public minutos: any;
  public aplicaciones: any;

  public recargaForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private recargaService: RecargaService,
    public notificationService: NotificationService,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.recargaForm = this.formBuilder.group({
      numero: [this.numero, [
        Validators.required,
      ]],
      valor: [this.valor, [
        Validators.required,
      ]],
      radio: [this.bolsa, [
        Validators.required
      ]]
    });
    this.valor = null;
    this.numero = null;
    this.getProducts();
  }

  setValue(valor: any) {
    this.valor = valor;
  }

  recargar() {
    if (this.numero == null && this.valor == null && this.bolsa == null || !this.numero ||  !this.valor || !this.bolsa) {
      this.notificationService.warn('Ingrese los valores para realizar la recarga');
    } else {
      this.recargaService.recarga(this.numero, this.valor, this.bolsa).subscribe(
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

  getProducts() {
    this.clientService.getProductos('datos').subscribe(
      list => {
        this.megas = list['Datos'];
      }
    );
    this.clientService.getProductos('aplicaciones').subscribe(
      list => {
        this.aplicaciones = list['Apps'];
      }
    );
    this.clientService.getProductos('minutos').subscribe(
      list => {
        this.minutos = list['Minutos'];
      }
    );
    this.clientService.getProductos('allInclusive').subscribe(
      list => {
        this.todo = list['all_inclusive'];
      }
    );
  }


}
