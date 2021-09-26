import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pages/models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public usuarios: Usuario[];
  errorMessage: string;
  idPerfilCliente = "6fa163ae-dc8a-481e-a829-3ecd0b096121";
  idPerfilFornecedor = "6fa163ae-dc8a-481e-a829-3ecd0b096122";

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obterTodos()
      .subscribe(
        usuario => this.usuarios = usuario,
        error => this.errorMessage);
  }

  identificarPerfil(perfil: string) {
    if(perfil == this.idPerfilFornecedor) {
      return 'Fornecedor';

    } else if(perfil == this.idPerfilCliente) {
      return 'Cliente';

    } else {
      return 'Colaborador'
    }
  }
}
