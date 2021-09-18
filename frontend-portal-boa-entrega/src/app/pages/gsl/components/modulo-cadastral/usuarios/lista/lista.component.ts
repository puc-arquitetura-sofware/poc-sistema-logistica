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

  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obterTodos()
      .subscribe(
        usuario => this.usuarios = usuario,
        error => this.errorMessage);
  }
}
