import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { SecurityService } from "./security.service";

@Injectable()
export class SecurityRouter implements CanActivate {

  constructor(private securityService: SecurityService,
              private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let active: boolean = false;
    this.securityService.onSession() ? active = true : this.router.navigate(['login']);
    // if(this.securityService.onSession()){
    //   active = true;
    // }
    // else{
    //   this.router.navigate(['/login']);
    // }
    return active;
  }

}
