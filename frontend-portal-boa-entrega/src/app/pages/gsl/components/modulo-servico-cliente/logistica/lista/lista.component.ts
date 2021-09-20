import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entrega } from 'src/app/pages/models/entrega';
import { LogisticaService } from '../services/logistica.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public entregas: Entrega[];
  public entregaSelecionada: Entrega;
  errorMessage: string;
  enderecoMap;

  constructor(
    private logisticaService: LogisticaService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.logisticaService.obterTodos()
      .subscribe(
        entregas => { 
          this.entregas = entregas
        },
        error => this.errorMessage);
  }

  abrirModal(content, model: Entrega) {
    this.entregaSelecionada = model;
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/directions?key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE&origin=" + this.entregaSelecionada.enderecoDeposito + "&destination="+ this.entregaSelecionada.enderecoCliente +"&avoid=tolls|highways");
    this.modalService.open(content, { size: 'lg'});
  }

  
}
