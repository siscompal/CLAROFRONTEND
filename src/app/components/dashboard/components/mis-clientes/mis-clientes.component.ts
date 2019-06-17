import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CrearCliComponent } from '../cliente/crear-cli/crear-cli.component';
import { NotificationService } from 'src/app/services/notification.service';
import { SaldoComponent } from '../cliente/saldo/saldo.component';
import { VerCliComponent } from '../cliente/ver-cli/ver-cli.component';
import { Client } from 'src/app/models/client';
import { EditarCliComponent } from '../cliente/editar-cli/editar-cli.component';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-mis-clientes',
  templateUrl: './mis-clientes.component.html',
  styleUrls: ['./mis-clientes.component.css']
})
export class MisClientesComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userService: UserService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'apellido', 'iden', 'rol', 'fecha', 'acciones'];
  public searchKey: string;
  public UserLogged: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getMisClientes().subscribe(
      list => {
        const array = list['clientes'];
        this.listData = new MatTableDataSource(array);
        this.listData.paginator = this.paginator;
      }
    );
    this.UserLogged = this.userService.getIdentity();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(CrearCliComponent, dialogConfig);
  }


  onDelete(id: any) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clientService.deleteCliente(id).subscribe(
        Response => {
          this.notificationService.warn('Cliente eliminado');
        }
      );
    }
  }

  saldo(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id: id};
    this.dialog.open(SaldoComponent, dialogConfig);
  }

  verCliente(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {id: id};
    this.dialog.open(VerCliComponent, dialogConfig);
  }

  onEdit(cliente: Client, id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {cliente: cliente, id: id};
    this.dialog.open(EditarCliComponent, dialogConfig);
  }

}
