import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoriaService } from '../services/mercadoria.service';

import { ToastrService } from 'ngx-toastr';

import { Mercadoria } from '../models/mercadoria';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  imagens: string = environment.imagensUrl;
  mercadoria: Mercadoria;

  constructor(private mercadoriaService: MercadoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.mercadoria = this.route.snapshot.data['mercadoria'];
  }

  public excluirMercadoria() {
    this.mercadoriaService.excluirMercadoria(this.mercadoria.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Mercadoria excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/mercadorias/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

