import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { MercadoriaRoutingModule } from './mercadoria-routing.module';
import { MercadoriaAppComponent } from './mercadoria.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { MercadoriaService } from '../../../services/mercadoria.service';
import { MercadoriaResolve } from './services/mercadoria.resolve';
import { MercadoriaGuard } from './services/mercadoria.guard';

@NgModule({
  declarations: [
    MercadoriaAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    MercadoriaRoutingModule,
    NgBrazil,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MercadoriaResolve,
    MercadoriaGuard
  ]
})
export class MercadoriaModule { }
