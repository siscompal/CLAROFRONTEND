import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../../../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ver-usu',
  templateUrl: './ver-usu.component.html',
  styleUrls: ['./ver-usu.component.css']
})
export class VerUsuComponent implements OnInit {

  public user: User;
  constructor(
    public dialogRef: MatDialogRef<VerUsuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UserService) {
      this.user = new User('', '', '', '', '', '', '', '');
     }

  ngOnInit() {
    this.userService.getUsuario(this.data['id']).subscribe(
      response => {
        if(response){
          this.user = response['user'];
          
        }
      }
    )
  }

}
