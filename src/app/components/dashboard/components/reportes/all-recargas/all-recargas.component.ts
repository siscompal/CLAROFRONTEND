import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../../../../services/user.service';
import { ExportarService } from '../../../../../services/exportar.service';
import {NotificationService} from '../../../../../services/notification.service';
import {RecargaCliente} from '../../../../../services/recarga.service';
import * as moment from 'moment';


@Component({
  selector: 'app-all-recargas',
  templateUrl: './all-recargas.component.html',
  styleUrls: ['./all-recargas.component.css']
})
export class AllRecargasComponent implements OnInit {
  private recarga: RecargaCliente={};
  private recargas:Array<RecargaCliente>=[];
  private recargass:Array<RecargaCliente>=[];

  constructor(private userService: UserService, private exportarService:ExportarService, private notificacionesServices:NotificationService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cliente', 'monto', 'numero', 'producto', 'fecha', 'obs'];
  public searchKey: string;
  public datosAFiltrar;
  public busqueda=false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.userService.getRecargas().subscribe(
      list => {
        for (const dato of list['InfoEncontrada']) {
          //console.log(dato);
          this.recarga={}
          let apellido="";
         
          this.recarga.fec_cre=moment(dato['fec_cre']).format('D/M/YYYY HH:mm:ss');
          //console.log(this.recarga.fec_cre);
          let nombre=dato['client']['name'];
          apellido=dato['client']['lastname'];
          this.recarga.client=`${nombre} ${apellido}`;
          this.recarga.monto=dato['monto'];
          this.recarga.numero=dato['numero'];
          this.recarga.producto=dato['producto']['name'];
          this.recarga.respuesta=dato['respuesta']; 
          this.recargas.push(this.recarga);
          
        }
        
        this.listData = new MatTableDataSource(this.recargas);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );


  }
  //METODO EXPORTAR
  exportarXlsx():void{

    this.exportarService.exportarExcel(this.listData.data, 'recargas');
  }
  //EXPORTAR CON FILTRO
  exportarFiltro():void{

    this.exportarService.exportarExcel(this.listData.filteredData,'recargas')
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
 }
 buscarD(event){
  this.recargass=[];
  
 
  this.datosAFiltrar=event;
  this.recarga={};
  
      let fechaInicial=moment(this.datosAFiltrar['fechaInicial'],'D/M/YYYY').toDate();
      let fechaFinal=moment(this.datosAFiltrar['fechaFinal'],'D/M/YYYY').toDate();
      let nombre=this.datosAFiltrar['nombreCliente'].toLowerCase();
      let producto= this.datosAFiltrar['producto'];
      let observacion=this.datosAFiltrar['observacion'].toLowerCase();
     
     
       
        if(moment(fechaFinal).isSameOrAfter(fechaInicial) ){
          

          this.userService.getRecargas().subscribe(
            list=>{
              for (const dato of list['InfoEncontrada']) {
                this.recarga={}
                
                this.recarga.fec_cre=moment(dato['fec_cre']).format('D/M/YYYY HH:mm:ss');
               
               
                let fecha2=moment(this.recarga.fec_cre,'D/M/YYYY').toDate();
                
                
                
          if(fechaInicial.getTime()<=fecha2.getTime() && fechaFinal.getTime()>=fecha2.getTime()){
            if(dato.length != 0){
            
            
            if((this.datosAFiltrar['numero']==dato['numero']||this.datosAFiltrar['numero']==null || this.datosAFiltrar['numero']=="" )&&
           (( dato['client']['name'].toLowerCase().indexOf(nombre)!=-1 || dato['client']['lastname'].toLowerCase().indexOf(nombre)!=-1) ||( nombre==""))&&
           (dato['producto']['name'].indexOf(producto)!=-1 || producto=="seleccione") &&
           (dato['respuesta'].toLowerCase().indexOf(observacion)!=-1 )
            ){
 
            
            let nombre=dato['client']['name'];
            let apellido=dato['client']['lastname'];
            this.recarga.client=`${nombre} ${apellido}`;
            this.recarga.monto=dato['monto'];
            this.recarga.numero=dato['numero'];
            this.recarga.producto=dato['producto']['name'];
            this.recarga.respuesta=dato['respuesta'];
            this.recargass.push(this.recarga);
              
          }else{console.log("No se encuentran registros con estos datos");}
           
           }else {break;}
          }else{
            
            break;
          }
          }
          this.listData = new MatTableDataSource(this.recargass);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
         
           },
           error => {
            this.notificacionesServices.warn(error.error.message);
          });

        }else{
          this.notificacionesServices.warn("La fecha inicial debe se menor");
          
        }

      

    
 }

}
