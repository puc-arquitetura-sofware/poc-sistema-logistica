import { Component, OnInit } from '@angular/core';
import { Mercadoria } from '../models/mercadoria';
import { MercadoriaService } from '../services/mercadoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public mercadorias: Mercadoria[];
  errorMessage: string;

  constructor(private mercadoriaService: MercadoriaService) { }

  ngOnInit(): void {
    this.mercadoriaService.obterTodos()
      .subscribe(
        mercadorias => this.mercadorias = mercadorias,
        error => this.errorMessage);
  }
}
