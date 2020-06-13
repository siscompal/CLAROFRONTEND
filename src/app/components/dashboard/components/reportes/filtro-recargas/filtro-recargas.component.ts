import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filtro} from './filtro'
import { ProductService } from '../../../../../services/product.service';
import * as moment from 'moment';
interface Productos {
  value: string;
 
  
}

@Component({
  selector: 'app-filtro-recargas',
  templateUrl: './filtro-recargas.component.html',
  styleUrls: ['./filtro-recargas.component.css']
})
export class FiltroRecargasComponent implements OnInit {
  public filtro:Filtro;
  //selectedValue: string;
  productos: Productos[] = [];
 
  @Output() datosBuscar = new EventEmitter();

  constructor(private productService: ProductService) {
    this.filtro=new Filtro();
    let fecha = moment(new Date(),'D/M/YYYY HH:mm:ss');

    this.filtro.fechaInicial=fecha;
    this.filtro.fechaFinal=fecha;
    this.filtro.nombreCliente="";
    this.filtro.numero="";
    this.filtro.producto="";
    this.filtro.observacion=""
 
   }
  
 

  ngOnInit(): void {
    this.productService.getProductos().subscribe(  
      list => {
        for (const dato of list['products']) {
       let producto= dato['name'];
     
      this.productos.push(producto);
      }}
    );
  }
  buscar(){
    console.log(this.filtro.producto);
    this.datosBuscar.emit({
    'fechaInicial':moment(this.filtro.fechaInicial).format('D/M/YYYY'),
    'fechaFinal': moment(this.filtro.fechaFinal).format('D/M/YYYY'),
    'nombreCliente': this.filtro.nombreCliente,
    'numero': this.filtro.numero,
    'producto': this.filtro.producto,
    'observacion': this.filtro.observacion
  });}}