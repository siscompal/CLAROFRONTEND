import * as moment from 'moment';

export class Filtro{

 public fechaInicial:Date;
  public fechaFinal:Date;
  public nombreCliente:string
  public tipo:string;
  public concepto:string
  public asignado:string;
  
    constructror(){
         
        this.fechaInicial=moment(new Date(),'D/M/YYYY').toDate();
        this.fechaFinal=moment(new Date(),'D/M/YYYY').toDate();
        this.nombreCliente="";
        this.tipo="";
        this.concepto="";
        this.asignado="";
       
    }
}