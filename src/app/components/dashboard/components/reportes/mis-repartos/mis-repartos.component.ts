import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ClientService } from '../../../../../services/client.service';

@Component({
  selector: 'app-mis-repartos',
  templateUrl: './mis-repartos.component.html',
  styleUrls: ['./mis-repartos.component.css']
})
export class MisRepartosComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'concepto', 'valor', 'total', 'usuario', 'obs'];
  public searchKey: string;
  public UserLogged: any;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getRepartos().subscribe(
      list => {
        const array = list['InfoEncontrada'];
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
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

}
