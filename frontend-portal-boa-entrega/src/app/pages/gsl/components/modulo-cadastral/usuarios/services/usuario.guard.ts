import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';

@Injectable()
export class UsuarioGuard extends BaseGuard implements CanActivate {

    constructor(protected router: Router) { super(router); }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return super.validarClaims(routeAc, state);
    }
}