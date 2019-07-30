import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VerUsuComponent } from '../ver-usu/ver-usu.component';
import { CrearUsuComponent } from '../crear-usu/crear-usu.component';
import { EditarUsuComponent } from '../editar-usu/editar-usu.component';
import { User } from 'src/app/models/user';




@Component({
  selector: 'app-listar-usu',
  templateUrl: './listar-usu.component.html',
  styleUrls: ['./listar-usu.component.css']
})
export class ListarUsuComponent implements OnInit {
 
  public listData: MatTableDataSource<any>;
  public displayedColumns: string [] = ['nombre', 'apellido', 'iden', 'estado', 'rol', 'fecha', 'acciones'];
  public searchKey: string;
  

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

   

    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.userService.getUsuarios().subscribe(
      list => {
        // tslint:disable-next-line: no-string-literal
        const array = list['users'];
        this.listData = new MatTableDataSource(array);
        this.listData.paginator = this.paginator;
      }

    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(id: any) {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.deleteUsuario(id).subscribe(
        Response => {
          this.notificationService.success('Usuario eliminado');
        }
      );
    }
  }

  verUsuario(Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {id: Id};
    this.dialog.open(VerUsuComponent, dialogConfig);
  }

  onEdit(user: User, Id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {usuario: user, id: Id};
    this.dialog.open(EditarUsuComponent, dialogConfig);
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(CrearUsuComponent, dialogConfig);
  }

}
