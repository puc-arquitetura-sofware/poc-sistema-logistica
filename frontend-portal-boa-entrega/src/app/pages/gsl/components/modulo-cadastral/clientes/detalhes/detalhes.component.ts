import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MercadoriaService } from 'src/app/pages/gsl/services/mercadoria.service';
import { Mercadoria } from 'src/app/pages/models/mercadoria';
import { MercadoriaCliente } from 'src/app/pages/models/mercadoriaCliente';
import { MercadoriaDeposito } from 'src/app/pages/models/mercadoriaDeposito';
import { Usuario } from 'src/app/pages/models/usuario';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  cliente: Usuario;
  enderecoMap;
  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";
  mercadoriasCliente: Mercadoria[] = []
  mercadoriaCliente: MercadoriaCliente;
  errors: any[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private mercadoriaService: MercadoriaService) {

      this.cliente = this.route.snapshot.data['cliente'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
      this.preencherMercadoriasCliente();
  }

  public EnderecoCompleto(): string {
    return this.cliente.endereco.logradouro + ", " + this.cliente.endereco.numero + " - " + this.cliente.endereco.bairro + ", " + this.cliente.endereco.cidade + " - " + this.cliente.endereco.estado;
  }

  preencherMercadoriasCliente() {
    this.mercadoriaService.obterPorCliente(this.cliente.id).subscribe( 
      mercadoria => {
        this.mercadoriasCliente = mercadoria;
      },
      falha => { this.processarFalha(falha) }
      );

  }

  
  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
