import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Entrega } from 'src/app/pages/models/entrega';
import { Usuario } from 'src/app/pages/models/usuario';
import { LogisticaService } from './logistica.service';

@Injectable()
export class LogisticaResolve implements Resolve<Entrega> {

    constructor(private logisticaService: LogisticaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.logisticaService.obterPorId(route.params['id']);
    }
}