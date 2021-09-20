import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from 'src/app/pages/models/usuario';
import { ClienteService } from './cliente.service';

@Injectable()
export class ClienteResolve implements Resolve<Usuario> {

    constructor(private clienteService: ClienteService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.clienteService.obterPorId(route.params['id']);
    }
}