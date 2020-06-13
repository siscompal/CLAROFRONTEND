import * as moment from 'moment';

export class Filtro{

 public fechaInicial;
  public fechaFinal;
  public nombreCliente:string;
  public numero:string;
  public producto: string;
  public observacion: string;
    constructror(){
         
        this.fechaInicial=moment(new Date).format('D/M/YYYY');
        this.fechaFinal=moment(new Date()).format('D/M/YYYY');
        this.nombreCliente="";
        this.numero="";
        this.producto="";
        this.observacion=""

    }
}