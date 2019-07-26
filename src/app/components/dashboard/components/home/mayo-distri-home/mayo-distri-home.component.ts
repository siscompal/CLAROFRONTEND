import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../../services/client.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(
    private clientService: ClientService,
    private notificationService: NotificationService
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
  
  onSubmit(){
    if(this.origen === this.destino) {
      this.notificationService.warn("La bolsa de origen y destino no pueden ser iguales");
    } else {
      this.clientService.pasarSaldo(this.origen, this.destino).subscribe(
        response => {
          if(response) {
            this.notificationService.success("Tranferencia exitosa");
            this.ngOnInit();
          }
        },

        error => {
          this.notificationService.warn(error.error.message);
          
        }
      )
    }
  }

}
