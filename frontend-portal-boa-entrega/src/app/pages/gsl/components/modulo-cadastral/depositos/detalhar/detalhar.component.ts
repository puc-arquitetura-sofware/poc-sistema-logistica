import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MercadoriaService } from 'src/app/pages/gsl/services/mercadoria.service';
import { Mercadoria } from 'src/app/pages/models/mercadoria';
import { MercadoriaDeposito } from 'src/app/pages/models/mercadoriaDeposito';
import { Deposito } from '../models/Deposito';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.component.html',
  styleUrls: ['./detalhar.component.css']
})
export class DetalharComponent {

  deposito: Deposito;
  enderecoMap;
  mercadoriasDeposito: Mercadoria[] = []
  mercadoriaDeposito: MercadoriaDeposito;
  errors: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private mercadoriaService: MercadoriaService) {
      this.deposito = this.route.snapshot.data['deposito'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
      this.preencherMercadoriasDeposito();
  }

  public EnderecoCompleto(): string {
    return this.deposito.enderecoDeposito.logradouro + ", " + this.deposito.enderecoDeposito.numero + " - " + this.deposito.enderecoDeposito.bairro + ", " + this.deposito.enderecoDeposito.cidade + " - " + this.deposito.enderecoDeposito.estado;
  }

  preencherMercadoriasDeposito() {
    this.mercadoriaService.obterPorDeposito(this.deposito.id).subscribe( 
      mercadoria => {
        this.mercadoriasDeposito = mercadoria;
      },
      falha => { this.processarFalha(falha) }
      );
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}