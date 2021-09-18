import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/pages/models/usuario';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  usuario: Usuario;
  enderecoMap;
  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";
  
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.usuario = this.route.snapshot.data['usuario'];
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.usuario.endereco.logradouro + ", " + this.usuario.endereco.numero + " - " + this.usuario.endereco.bairro + ", " + this.usuario.endereco.cidade + " - " + this.usuario.endereco.estado;
  }
}
