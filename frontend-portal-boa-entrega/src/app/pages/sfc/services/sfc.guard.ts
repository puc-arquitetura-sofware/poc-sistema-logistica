import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';



@Injectable()
export class SfcGuard  extends BaseGuard implements CanActivate{
    
    constructor(protected router: Router){ super(router); }
    

    canActivate(routeAc: ActivatedRouteSnapshot) {
        return super.validarClaims(routeAc);
    }
    
}