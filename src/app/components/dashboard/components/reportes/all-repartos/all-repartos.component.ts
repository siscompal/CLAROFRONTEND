import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { UserService, Saldo } from '../../../../../services/user.service';
import {ExportarService} from '../../../../../services/exportar.service';
import { NotificationService } from 'src/app/services/notification.service';

import * as moment from 'moment';

@Component({
  selector: 'app-all-repartos',
  templateUrl: './all-repartos.component.html',
  styleUrls: ['./all-repartos.component.css'] 
})
export class AllRepartosComponent implements OnInit {

  private reparto:Saldo={};
  private repartos:Array<Saldo>=[];
  private datosAFiltrar:{}={}
  private repartoos:Array<Saldo>=[];
  public busquedaAvanzada=false;

  constructor(private userService: UserService, private exportarServices:ExportarService,private notificationService: NotificationService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cliente', 'tipo', 'fecha', 'concepto', 'valor', 'total', 'usuario', 'obs'];
  public searchKey: string;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.userService.getRepartos().subscribe(
      list => {
        for(const dato of list['InfoEncontrada']){
          //console.log(dato);
          this.reparto={}
          this.reparto.fec_cre=new Date(dato['fec_cre']).toLocaleString();
          let nombre=dato['cliente']['name'];
          let apellido=dato['cliente']['lastname'];
          this.reparto.cliente=`${nombre} ${apellido}`;
          this.reparto.tipo=dato['tipo'];
          this.reparto.valor=dato['valor'];
          this.reparto.comision=dato['comision'];
          this.reparto.role=dato['cliente']['role'];          
          this.reparto.obs=dato['obs'];
          if((dato['client_Origen']==null) && (dato['user_Origen']==null)){this.reparto.user_Origen='Sistema';}
          else{
              if(dato['client_Origen']){this.reparto.user_Origen=dato['client_Origen']['name'];}
              else{this.reparto.user_Origen=dato['user_Origen']['name'];
          }}
         

         this.repartos.push(this.reparto);

        }
        this.listData = new MatTableDataSource(this.repartos);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
    
  }

  exportarSaldo():void {
   this.exportarServices.exportarExcel(this.listData.data,'saldos')
    
  }
  exportarSaldoFiltrado():void {
    this.exportarServices.exportarExcel(this.listData.filteredData,'saldos')
     
   }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  buscar(event){
    this.repartoos=[];
    
    this.reparto={};
    this.datosAFiltrar=event;
    let fechaInicio=moment(this.datosAFiltrar['fechaInicial'],'D/M/YYYY').toDate();
    let fechaFinal=moment(this.datosAFiltrar['fechaFinal'],'D/M/YYYY').toDate();
    let nombreCliente=this.datosAFiltrar['nombreCliente'];
    let tipo=this.datosAFiltrar['tipo'];
    let concepto=this.datosAFiltrar['concepto'];
    let asignado=this.datosAFiltrar['asignado'];
    
    if(moment(fechaFinal).isSameOrAfter(fechaInicio)){
      

      this.userService.getRepartos().subscribe(list=>{

        for(const dato of list['InfoEncontrada']){
          this.reparto={}
          
          this.reparto.fec_cre=moment(dato['fec_cre']).format('D/M/YYYY HH:mm:ss');

          let fecha2=moment(this.reparto.fec_cre,'D/M/YYYY').toDate();
          if((dato['client_Origen']==null) && (dato['user_Origen']==null)){this.reparto.user_Origen='Sistema';}
              else{
                  if(dato['client_Origen']){this.reparto.user_Origen=dato['client_Origen']['name'];}
                  else{this.reparto.user_Origen=dato['user_Origen']['name'];
              }}
          
          if(fechaInicio.getTime()<=fecha2.getTime() && fechaFinal.getTime()>=fecha2.getTime()){
              if(dato.length != 0){
              
              if(  (( dato['cliente']['name'].toLowerCase().indexOf(nombreCliente)!=-1) ||(dato['cliente']['lastname'].toLowerCase().indexOf(nombreCliente)!=-1) ||( nombreCliente==""))&&
           (dato['cliente']['role'].toLowerCase().indexOf(tipo.toLowerCase())!=-1 || tipo=="") &&
           (dato['tipo'].toLowerCase().indexOf(concepto.toLowerCase())!=-1 || concepto=="seleccione")&&
           (this.reparto.user_Origen.toLowerCase().indexOf(asignado.toLowerCase())!=-1 || asignado=="" )) {
              
              
          
              let nombre=dato['cliente']['name'];
              let apellido=dato['cliente']['lastname'];
              this.reparto.cliente=`${nombre} ${apellido}`;
              this.reparto.tipo=dato['tipo'];
              this.reparto.valor=dato['valor'];
              this.reparto.comision=dato['comision'];
              this.reparto.role=dato['cliente']['role'];          
              this.reparto.obs=dato['obs'];
              if((dato['client_Origen']==null) && (dato['user_Origen']==null)){this.reparto.user_Origen='Sistema';}
              else{
                  if(dato['client_Origen']){this.reparto.user_Origen=dato['client_Origen']['name'];}
                  else{this.reparto.user_Origen=dato['user_Origen']['name'];
              }}
    
              
              this.repartoos.push(this.reparto);
              }else{ 
                console.log('No se encuentran registros con estos datos');
                
            }
            }else{break;}
          }
          else{
            break;
          }


        }
          this.listData = new MatTableDataSource(this.repartoos);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;


      },
      error => {
        this.notificationService.warn(error.error.message);
      });

      
     }else{
      this.notificationService.warn('La fecha inicial debe se menor');
      
     }
  }

}
