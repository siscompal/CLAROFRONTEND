import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-all-repartos',
  templateUrl: './all-repartos.component.html',
  styleUrls: ['./all-repartos.component.css']
})
export class AllRepartosComponent implements OnInit {

  constructor(private userService: UserService) { }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cliente', 'tipo', 'fecha', 'concepto', 'valor', 'total', 'usuario', 'obs'];
  public searchKey: string;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.userService.getRepartos().subscribe(
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
