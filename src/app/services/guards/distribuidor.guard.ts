import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../user.service';


@Injectable()
export class DistribuidorGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate() {

        const identity = this.userService.getIdentity();
        if (identity && identity['role'] === 'CLI_DISTRIBUIDOR') {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }

}
