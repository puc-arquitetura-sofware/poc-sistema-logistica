import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Deposito } from '../models/Deposito';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.component.html',
  styleUrls: ['./detalhar.component.css']
})
export class DetalharComponent {

  deposito: Deposito;
  enderecoMap;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
      this.deposito = this.route.snapshot.data['deposito'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.deposito.enderecoDeposito.logradouro + ", " + this.deposito.enderecoDeposito.numero + " - " + this.deposito.enderecoDeposito.bairro + ", " + this.deposito.enderecoDeposito.cidade + " - " + this.deposito.enderecoDeposito.estado;
  }
}