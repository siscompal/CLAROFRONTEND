import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-listar-cli',
  templateUrl: './listar-cli.component.html',
  styleUrls: ['./listar-cli.component.css']
})
export class ListarCliComponent implements OnInit {

  constructor(private _userService: UserService) {}
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nombre', 'apellido','iden', 'estado', 'rol', 'fecha', 'observacion', 'acciones'];
  public searchKey: String;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._userService.getClientes().subscribe(
      list => {
        let array = list['clientes'];
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(element => {
            return element != 'acciones' && data[element].toLowerCase().indexOf(filter) != -1; 
          });
        };
      }

    );

  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
