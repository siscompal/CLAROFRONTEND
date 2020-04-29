import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ClientService } from '../../../../../services/client.service';

@Component({
  selector: 'app-mis-recargas',
  templateUrl: './mis-recargas.component.html',
  styleUrls: ['./mis-recargas.component.css']
})
export class MisRecargasComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['fecha', 'monto', 'numero', 'producto', 'obs'];
  public searchKey: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getRecargas().subscribe(
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
