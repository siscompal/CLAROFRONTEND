import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-all-recargas',
  templateUrl: './all-recargas.component.html',
  styleUrls: ['./all-recargas.component.css']
})
export class AllRecargasComponent implements OnInit {

  constructor(private userService: UserService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cliente', 'monto', 'numero', 'producto', 'fecha', 'obs'];
  public searchKey: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.userService.getRecargas().subscribe(
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
