import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Filtro} from './filtro';
import * as moment from 'moment';
interface Concepto {
  value: string;
 
  
}

@Component({
  selector: 'app-filtro-repartos',
  templateUrl: './filtro-repartos.component.html',
  styleUrls: ['./filtro-repartos.component.css']
})
export class FiltroRepartosComponent implements OnInit {
  @Output() datosBuscar = new EventEmitter();
  public filtro:Filtro;

  conceptos:Concepto[] = [
    {value: 'asignado',},
    {value: 'debitado'}
  ];

  constructor() { 

    this.filtro=new Filtro();
    let fecha = moment(new Date(),'D/M/YYYY HH:mm:ss').toDate();

    this.filtro.fechaInicial=fecha;
    this.filtro.fechaFinal=fecha;
    this.filtro.nombreCliente="";
    this.filtro.tipo="";
    this.filtro.asignado="";
    this.filtro.concepto="";
    
   }

  ngOnInit(): void {
  }

  buscar(){
    this.datosBuscar.emit({
      'fechaInicial':moment(this.filtro.fechaInicial).format('D/M/YYYY'),
      'fechaFinal': moment(this.filtro.fechaFinal).format('D/M/YYYY'),
      'nombreCliente':this.filtro.nombreCliente,
      'tipo':this.filtro.tipo,
      'concepto':this.filtro.concepto,
      'asignado':this.filtro.asignado
    });
  }
}
