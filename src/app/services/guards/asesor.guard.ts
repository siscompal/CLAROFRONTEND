import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user.service';


@Injectable()
export class AsesorGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate() {

        const identity = this.userService.getIdentity();
        console.log(identity);
        if (identity && identity['role'] === 'ROLE_ASESOR') {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }

}
