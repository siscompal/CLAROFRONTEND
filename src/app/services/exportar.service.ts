import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE=
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8 ';
const EXT_EXCEL='.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  constructor() { }

  exportarExcel(datos:any[], nombreArchivo: string): void{
    const worksheet: XLSX.WorkSheet=XLSX.utils.json_to_sheet(datos);
    const workbook: XLSX.WorkBook={Sheets:{'data': worksheet},
    SheetNames: ['data']
  };
  const excelBuffer: any= XLSX.write(workbook,{bookType: 'xlsx', type: 'array'});
  //llamar al metodo y se pasa lo que se tiene guardado en el buffer y el nombre del archivo
  this.guardarArchivo(excelBuffer,nombreArchivo);

    }

    private guardarArchivo(buffer: any, nombreArchivo: string): void{
      const   data: Blob= new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, nombreArchivo+'_export_'+ new Date().getTime()+EXT_EXCEL);
    }
}
