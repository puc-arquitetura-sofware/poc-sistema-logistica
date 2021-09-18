import { Component, Input, OnInit } from '@angular/core';
import { Mercadoria } from 'src/app/pages/models/mercadoria';

@Component({
  selector: 'app-lista-mercadoria',
  templateUrl: './lista-mercadoria.component.html',
  styleUrls: ['./lista-mercadoria.component.css']
})
export class ListaMercadoriaComponent implements OnInit   {
  ngOnInit(): void {
    debugger;
    this.mercadoriaFilter = this.mercadorias;
    
  }


  @Input()
  mercadorias: Mercadoria[];

  @Input()
  titulo: string = "Mercadorias";

  mercadoriaFilter: Mercadoria[];

  filtrar(value: string) {
    debugger;
    this.mercadorias = this.mercadoriaFilter;
    if(!value) {
      this.mercadorias = this.mercadoriaFilter;
   } else {
     this.mercadorias = this.mercadoriaFilter.filter(x => 
        x.nome.trim().toLowerCase().includes(value.trim().toLowerCase())
     );
   }
  }

}
