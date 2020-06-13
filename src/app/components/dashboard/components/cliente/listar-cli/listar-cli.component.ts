import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {  MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator'
import { CrearCliComponent } from '../crear-cli/crear-cli.component';
import { NotificationService } from 'src/app/services/notification.service';
import { SaldoComponent } from '../saldo/saldo.component';
import { VerCliComponent } from '../ver-cli/ver-cli.component';
import { Client } from 'src/app/models/client';
import { EditarCliComponent } from '../editar-cli/editar-cli.component';
import { UserService } from '../../../../../services/user.service';
import { CambiarPassComponent } from '../../cambiar-pass/cambiar-pass.component';

@Component({
  selector: 'app-listar-cli',
  templateUrl: './listar-cli.component.html',
  styleUrls: ['./listar-cli.component.css']
})
export class ListarCliComponent implements OnInit {

  constructor(private clientService: ClientService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private userService: UserService) {}

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'apellido', 'iden', 'rol', 'fecha', 'acciones'];
  public searchKey: string;
  public UserLogged: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getClientes().subscribe(
      list => {
        const array = list['clientes'];
        console.log(array);
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
    dialogConfig.width = '90%';
    dialogConfig.height = '100%';
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
    dialogConfig.width = '90%';
    dialogConfig.height = '100%';
    dialogConfig.data = {id: id};
    this.dialog.open(VerCliComponent, dialogConfig);
  }

  onEdit(cliente: Client, id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = {cliente: cliente, id: id};
    this.dialog.open(EditarCliComponent, dialogConfig);
  }

  changePass(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.data = {id: id};
    this.dialog.open(CambiarPassComponent, dialogConfig);
  }

}
