import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';



@Injectable()
export class SgeGuard  extends BaseGuard implements CanActivate{
    
    constructor(protected router: Router){ super(router); }
    
    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return super.validarClaims(routeAc, state);
    }
    
}