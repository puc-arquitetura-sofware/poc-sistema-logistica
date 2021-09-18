import { Component, OnInit } from '@angular/core';
import { Deposito } from '../models/Deposito';
import { DepositoService } from '../services/deposito.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public depositos: Deposito[];
  depositoFilter: Deposito[];
  errorMessage: string;

  constructor(private depositoService: DepositoService) { }

  ngOnInit(): void {
    this.depositoService.obterTodos()
      .subscribe(
        depositos => { 
          this.depositos = depositos;
          this.depositoFilter = this.depositos;
          
        },
        error => this.errorMessage);

  }


  filtrar(value: string) {
    debugger;
    this.depositos = this.depositoFilter;
    if(!value) {
      this.depositos = this.depositoFilter;
   } else {
     this.depositos = this.depositoFilter.filter(x => 
        x.enderecoDeposito.logradouro.trim().toLowerCase().includes(value.trim().toLowerCase())
     );
   }
  }
}
