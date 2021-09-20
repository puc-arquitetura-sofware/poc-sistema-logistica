import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente.service';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ClienteAppComponent } from './clientes.app.component';
import { ClienteResolve } from './services/cliente.resolve';
import { ClienteGuard } from './services/cliente.guard';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClienteAppComponent, 
    ListaComponent, 
    DetalhesComponent, 
    EditarComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgBrazil,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ClienteService,
    ClienteResolve,
    ClienteGuard
  ]
})
export class ClientesModule { }
