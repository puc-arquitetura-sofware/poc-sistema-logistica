import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaAppComponent } from './logistica.app.component';
import { ListaComponent } from './lista/lista.component';
import { LogisticaService } from './services/logistica.service';
import { LogisticaResolve } from './services/logistica.resolve';
import { LogisticaGuard } from './services/logistica.guard';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LogisticaAppComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    SharedModule
  ],
  providers: [
    LogisticaService,
    LogisticaResolve,
    LogisticaGuard
  ]
})
export class LogisticaModule { }
