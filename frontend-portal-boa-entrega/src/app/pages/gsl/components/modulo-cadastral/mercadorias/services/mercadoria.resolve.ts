import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Mercadoria } from '../../../../../models/mercadoria';
import { MercadoriaService } from '../../../../services/mercadoria.service';

@Injectable()
export class MercadoriaResolve implements Resolve<Mercadoria> {

    constructor(private mercadoriaService: MercadoriaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.mercadoriaService.obterPorId(route.params['id']);
    }
}