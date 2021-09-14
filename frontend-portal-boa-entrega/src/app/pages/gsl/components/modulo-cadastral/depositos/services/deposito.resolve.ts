import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Deposito } from '../models/deposito';
import { DepositoService } from './deposito.service';

@Injectable()
export class DepositoResolve implements Resolve<Deposito> {

    constructor(private depositoService: DepositoService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.depositoService.obterPorId(route.params['id']);
    }
}
