import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../../services/client.service';

@Component({
  selector: 'app-mayo-distri-home',
  templateUrl: './mayo-distri-home.component.html',
  styleUrls: ['./mayo-distri-home.component.css']
})
export class MayoDistriHomeComponent implements OnInit {

  public saldos: Array<number> = [0,0,0];
  public n_saldos: Array<string> = ['Saldo', 'Comisión', 'Incentivo'];
  public mapSaldos: any;
  public origen: string;
  public destino: string;
  public bolsaOrigen = [
    {id: 1, name: 'Comision'},
    {id: 2, name: 'Incentivo'},
  ];

  public bolsaDestino = [
    {id: 1, name: 'Saldo'},
    {id: 2, name: 'Comision'},
    {id: 3, name: 'Incentivo'}
  ];


  constructor(
    private clientService: ClientService
  ){}

  ngOnInit() {
    this.clientService.getMyInfo().subscribe(
      response => {
        let aux = response['cliente'];
        this.saldos[0] = aux.saldo_actual;
        this.saldos[1] = aux.comision_actual;
        this.saldos[2] = aux.incentivo_actual;
        this.mapSaldos = this.saldos.map((v, i) => [v, this.n_saldos[i]]);
      }
    );
    
   


  }
  onChange(){
    if(this.origen == this.bolsaOrigen[0].name){
      this.bolsaDestino = [
        {id: 1, name: 'Saldo'},
      ];

    } 
    if(this.origen == this.bolsaOrigen[1].name){
      this.bolsaDestino = [
        {id: 2, name: 'Comision'},
       
      ];
    }

  }
  onSubmit(){
    console.log("algo ahi");
  }

}
