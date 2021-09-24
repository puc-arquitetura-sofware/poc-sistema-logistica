import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {  UsuarioService } from '../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/pages/models/usuario';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  usuario: Usuario;
  enderecoMap;
  errors: any[] = [];

  idPerfilCliente = "6fa163ae-dc8a-481e-a829-3ecd0b096121";
  idPerfilFornecedor = "6fa163ae-dc8a-481e-a829-3ecd0b096122";
  perfil : string;
  
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.usuario = this.route.snapshot.data['usuario'];
    this.identificarPerfil()
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.usuario.endereco.logradouro + ", " + this.usuario.endereco.numero + " - " + this.usuario.endereco.bairro + ", " + this.usuario.endereco.cidade + " - " + this.usuario.endereco.estado;
  }

  excluirEvento() {
    this.usuarioService.excluirUsuario(this.usuario.id)
      .subscribe(
        usuario => { this.sucessoExclusao(usuario) },
        error => { this.falha(error) }
      );
  }

  public identificarPerfil() {
    if(this.usuario.perfil === this.idPerfilFornecedor) {
      this.perfil = 'Fornecedor';

    } else if(this.usuario.perfil === this.idPerfilCliente) {
      this.perfil = 'Cliente';

    } else {
      this.perfil = 'Colaborador';
    }

  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Usuario excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/gsl/modulo-gestao-servicos-logistica/modulo-cadastral/usuarios/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
