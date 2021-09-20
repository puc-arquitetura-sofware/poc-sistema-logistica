import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloServicoClienteRoutingModule } from './modulo-servico-cliente-routing.module';
import { ModuloServicoClienteAppComponent } from './modulo-servico-cliente-app.component';
import { ModuloServicoClienteMainComponent } from './modulo-servico-cliente-main/modulo-servico-cliente-main.component';


@NgModule({
  declarations: [
    ModuloServicoClienteAppComponent,
    ModuloServicoClienteMainComponent
  ],
  imports: [
    CommonModule,
    ModuloServicoClienteRoutingModule
  ]
})
export class ModuloServicoClienteModule { }
