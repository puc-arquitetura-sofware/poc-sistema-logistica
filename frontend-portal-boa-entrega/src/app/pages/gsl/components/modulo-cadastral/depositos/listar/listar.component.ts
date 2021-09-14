import { Component, OnInit } from '@angular/core';
import { Deposito } from '../models/deposito';
import { DepositoService } from '../services/deposito.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public depositos: Deposito[];
  errorMessage: string;

  constructor(private depositoService: DepositoService) { }

  ngOnInit(): void {
    this.depositoService.obterTodos()
      .subscribe(
        depositos => this.depositos = depositos,
        error => this.errorMessage);
  }

}
