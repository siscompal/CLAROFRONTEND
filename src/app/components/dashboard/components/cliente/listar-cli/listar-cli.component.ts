import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CrearCliComponent } from '../crear-cli/crear-cli.component';

@Component({
  selector: 'app-listar-cli',
  templateUrl: './listar-cli.component.html',
  styleUrls: ['./listar-cli.component.css']
})
export class ListarCliComponent implements OnInit {

  constructor(private _userService: UserService, private dialog: MatDialog) {}
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'apellido', 'iden', 'estado', 'rol', 'fecha', 'observacion', 'acciones'];
  public searchKey: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this._userService.getClientes().subscribe(
      list => {
        const array = list['clientes'];
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log(array);
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

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(CrearCliComponent, dialogConfig);

  }
}
