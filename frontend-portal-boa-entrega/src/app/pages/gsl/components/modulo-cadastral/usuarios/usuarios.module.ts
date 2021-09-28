import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { UsuarioResolve } from './services/usuario.resolve';
import { UsuarioGuard } from './services/usuario.guard';
import { UsuarioAppComponent } from './usuario.app.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { NovoComponent } from './novo/novo.component';


@NgModule({
  declarations: [
    UsuarioAppComponent, 
    ListaComponent, 
    NovoComponent,
    DetalhesComponent, 
    EditarComponent, 
    ExcluirComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NgBrazil,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsuarioService,
    UsuarioResolve,
    UsuarioGuard
  ]
})
export class UsuariosModule { }
