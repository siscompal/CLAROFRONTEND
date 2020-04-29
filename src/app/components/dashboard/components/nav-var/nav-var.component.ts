import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService} from '../../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {
  public UserLogged: any;
  public showFiller: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
     
      
    }
    ngOnInit() {
      this.showFiller = true;
      this.UserLogged = this.userService.getIdentity();
    }
    
    
    logout() {
      localStorage.clear();
      this.router.navigate(['']);
  
  }
  ngAfterViewInit(){
    
  }
  
  

}
