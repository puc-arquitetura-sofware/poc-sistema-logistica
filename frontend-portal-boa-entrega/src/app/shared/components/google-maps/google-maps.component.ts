import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent {

  enderecoMap;

  @Input()
  EnderecoOrigem: string;
  
  @Input()
  EnderecoDestino: string;


  constructor(private sanitizer: DomSanitizer) {
      debugger
      // this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/directions?key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE&origin=" + this.EnderecoCompletoOrigem() + "&destination="+ this.EnderecoCompletoDestino() +"&avoid=tolls|highways");
      
  }

  public EnderecoCompletoOrigem(): string {
    debugger;
    return this.EnderecoOrigem;
    // return "Rua Barão Amaral de Cabo frio, 50 - Jardim Itápolis, São Paulo - SP";
  }

  public EnderecoCompletoDestino() {
    debugger;
    return this.EnderecoDestino;
    // return "Avenida Celso Garcia, 500 - Bras, São Paulo - SP"
  }
}
