import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Client } from '../../../../../models/client';
import { ClientService } from '../../../../../services/client.service';

@Component({
  selector: 'app-ver-cli',
  templateUrl: './ver-cli.component.html',
  styleUrls: ['./ver-cli.component.css']
})

export class VerCliComponent implements OnInit {

  public client: Client;
  constructor(
    public dialogRef: MatDialogRef<VerCliComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private clientService: ClientService,) {
      this.client = new Client('', '', '', '', '', '', '', '', '', '', 0);
  }

  ngOnInit(){
    this.clientService.getCliente(this.data['id']).subscribe(
      response => {
        if (response){
          this.client = response['cliente'];
        }
      }
    )
  }

}
