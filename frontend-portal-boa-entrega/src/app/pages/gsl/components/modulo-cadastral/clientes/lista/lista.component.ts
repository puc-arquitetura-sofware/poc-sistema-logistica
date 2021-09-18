import { Component, OnInit } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Usuario } from 'src/app/pages/models/usuario';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public clientes: Usuario[];
  errorMessage: string;

  idPerfilCliente = "5fa163ae-dc8a-481e-a829-3ecd0b096121";
  
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.obterTodos()
      .subscribe(
        usuario => this.clientes = usuario.filter(x => x.perfil == this.idPerfilCliente),
        error => this.errorMessage);
  }
}
