import { Component } from '@angular/core';
import { Mercadoria } from '../models/mercadoria';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  mercadoria: Mercadoria;

  constructor(private route: ActivatedRoute) {

    this.mercadoria = this.route.snapshot.data['mercadoria'];
  }

}
