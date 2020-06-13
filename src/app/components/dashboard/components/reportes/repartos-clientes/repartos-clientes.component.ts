import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService, Saldo } from '../../../../../services/user.service';
import {ExportarService} from '../../../../../services/exportar.service';

@Component({
  selector: 'app-repartos-clientes',
  templateUrl: './repartos-clientes.component.html',
  styleUrls: ['./repartos-clientes.component.css']
})
export class RepartosClientesComponent implements OnInit {
  private reparto:Saldo={};
  private repartos:Array<Saldo>=[];

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userService: UserService,
    private exportarService:ExportarService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'concepto', 'valor', 'total', 'cliente', 'obs', 'rol'];
  public searchKey: string;
  public UserLogged: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getMovRepartos().subscribe(
      list => {
        for(const dato of list['InfoEncontrada']){
          this.reparto={};
        this.reparto.fec_cre=new Date(dato['fec_cre']).toLocaleString();
        this.reparto.tipo=dato['tipo'];
        this.reparto.valor=dato['valor'];
        this.reparto.cliente=dato['cliente']['name'];
        this.reparto.obs=dato['obs'];
        this.reparto.role=dato['cliente']['role'];
        this.reparto.comision=dato['comision'];
        this.repartos.push(this.reparto);
        console.log(list['InfoEncontrada']);
        
         
      }
        
        this.listData = new MatTableDataSource(this.repartos); 
        this.listData.paginator = this.paginator;
      }
    );
    this.UserLogged = this.userService.getIdentity();
  }
  exportarSaldo():void{
    this.exportarService.exportarExcel(this.listData.data,'saldos');
  }
  exportarSaldoFiltrado():void{
    this.exportarService.exportarExcel(this.listData.filteredData,'saldos_filt');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
