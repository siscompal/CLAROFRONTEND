import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-repartos-clientes',
  templateUrl: './repartos-clientes.component.html',
  styleUrls: ['./repartos-clientes.component.css']
})
export class RepartosClientesComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private userService: UserService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'concepto', 'valor', 'total', 'cliente', 'obs', 'rol'];
  public searchKey: string;
  public UserLogged: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getMovRepartos().subscribe(
      list => {
        const array = list['InfoEncontrada'];
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

}
