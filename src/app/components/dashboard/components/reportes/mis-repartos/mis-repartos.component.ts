import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientService } from '../../../../../services/client.service';
import {ExportarService} from '../../../../../services/exportar.service';
import {Saldo} from '../../../../../services/user.service'

@Component({
  selector: 'app-mis-repartos',
  templateUrl: './mis-repartos.component.html',
  styleUrls: ['./mis-repartos.component.css']
})
export class MisRepartosComponent implements OnInit {
  private saldo:Saldo={};
  private saldos:Array<Saldo>=[];

  constructor(private clientService: ClientService, private exportarSaldo:ExportarService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'concepto', 'valor', 'total', 'usuario', 'obs'];
  public searchKey: string;
  public UserLogged: any;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getRepartos().subscribe(
      list => {
        for(const dato of list['InfoEncontrada']){
          //console.log(dato);
          this.saldo={};
          this.saldo.fec_cre=new Date(dato['fec_cre']).toLocaleString();
          this.saldo.tipo=dato['tipo'];
          this.saldo.valor=dato['valor'];
          this.saldo.comision=dato['comision'];
          if(dato['user_Origen']==null){this.saldo.user_Origen='Sistema'}
          else{
          this.saldo.user_Origen=dato['user_Origen']['name']}
          this.saldo.obs=dato['obs'];
          this.saldos.push(this.saldo);

        }
        
        
        this.listData = new MatTableDataSource(this.saldos);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }
  //EXPORTAR SALDO ASIGNADOS A EXCEL
  exportarSaldos():void{
    
    //ENVIO EL ARREGLO CON LOS DATOS ORGANIZADOS A EL SERVICIO
    this.exportarSaldo.exportarExcel(this.listData.data,'saldos')



  }
  //EXPORTAR SALDO FILTRADOS
  exportarSaldosFiltrado():void{
 
  this.exportarSaldo.exportarExcel(this.listData.filteredData,'saldos_filt')
    

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    console.log();
    this.listData.filter = this.searchKey.trim().toLowerCase();  
    
  }

}
