import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloGestaoEstrategicaRoutingModule } from './modulo-gestao-estrategica-routing.module';
import { ModuloGestaoEstrategicaMainComponent } from './modulo-gestao-estrategica-main/modulo-gestao-estrategica-main.component';
import { ModuloGestaoEstrategicaAppComponent } from './modulo-gestao-estrategica-app.component';


@NgModule({
  declarations: [
    ModuloGestaoEstrategicaAppComponent,
    ModuloGestaoEstrategicaMainComponent],
  imports: [
    CommonModule,
    ModuloGestaoEstrategicaRoutingModule
  ]
})
export class ModuloGestaoEstrategicaModule { }
