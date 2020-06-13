import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { ClientService } from '../../../../../services/client.service';
import {ExportarService} from '../../../../../services/exportar.service';
import{RecargaCliente} from '../../../../../services/recarga.service';


@Component({
  selector: 'app-mis-recargas',
  templateUrl: './mis-recargas.component.html',
  styleUrls: ['./mis-recargas.component.css']
})
export class MisRecargasComponent implements OnInit{
  private recarga: RecargaCliente={};
  

  constructor(private clientService: ClientService, private exportarService: ExportarService) { }

  public listData: MatTableDataSource<object>;
  public displayedColumns: string[] = ['fecha', 'monto', 'numero', 'producto', 'obs'];
  public searchKey: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getRecargas().subscribe(
      list => {

       let rec:RecargaCliente;
        let array2:Array<RecargaCliente>=[];
        
   for (const info of list['InfoEncontrada']) {
    rec={};
    rec.fec_cre = new Date(info['fec_cre']).toLocaleString();
    rec.monto=info['monto'];
    rec.numero=info['numero'];
    rec.producto=info['producto']['name'];
    rec.respuesta=info['respuesta'];
    array2.push(rec);
    //console.log(JSON.stringify(recargas));

   }
        //const array = list['InfoEncontrada'];
        this.listData = new MatTableDataSource(array2);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        
      }
    );
  }
   //METODO EXPORTAR
   exportarXlsx():void{
  
  this.exportarService.exportarExcel(this.listData.data, 'recargas');
  }
  //EXPORTAR CON FILTRO
  exportarFiltro():void{
  
    this.exportarService.exportarExcel(this.listData.filteredData,'recargas')
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}







