import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Usuario } from 'src/app/pages/models/usuario';
import { UsuarioService } from './usuario.service';

@Injectable()
export class UsuarioResolve implements Resolve<Usuario> {

    constructor(private usuarioService: UsuarioService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.usuarioService.obterPorId(route.params['id']);
    }
}