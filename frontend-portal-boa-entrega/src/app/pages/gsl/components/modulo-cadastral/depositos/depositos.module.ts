import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositosRoutingModule } from './depositos-routing.module';
import { ListarComponent } from './listar/listar.component';
import { EditarComponent } from './editar/editar.component';
import { NovoComponent } from './novo/novo.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalharComponent } from './detalhar/detalhar.component';
import { DepositoService } from './services/deposito.service';
import { DepositoGuard } from './services/deposito.guard';
import { DepositoResolve } from './services/deposito.resolve';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { DepositoAppComponent } from './deposito.app.component';


@NgModule({
  declarations: [
    DepositoAppComponent, 
    ListarComponent, 
    EditarComponent, 
    NovoComponent, 
    ExcluirComponent, 
    DetalharComponent],
  imports: [
    CommonModule,
    DepositosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    
  ],
  providers: [DepositoService, DepositoGuard, DepositoResolve]
})
export class DepositosModule { }
