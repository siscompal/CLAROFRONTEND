import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public UserLogged: any;
  public showFiller: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute ) {

   }


  ngOnInit() {
    this.showFiller = true;
    this.UserLogged = this.userService.getIdentity();
  }

logout() {
    localStorage.clear();
    this.router.navigate(['']);

}

}
