import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deposito } from '../models/Deposito';
import { DepositoService } from '../services/deposito.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent {

  deposito: Deposito;
  enderecoMap;
  errors: any[] = [];

  constructor(
    private depositoService: DepositoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.deposito = this.route.snapshot.data['deposito'];
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.deposito.enderecoDeposito.logradouro + ", " + this.deposito.enderecoDeposito.numero + " - " + this.deposito.enderecoDeposito.bairro + ", " + this.deposito.enderecoDeposito.cidade + " - " + this.deposito.enderecoDeposito.estado;
  }

  excluirDeposito() {
    debugger;
    this.depositoService.excluirDeposito(this.deposito.id)
      .subscribe(
        deposito => { this.sucessoExclusao(deposito) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('deposito excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/depositos/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
