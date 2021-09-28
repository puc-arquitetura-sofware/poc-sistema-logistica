import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloCienciaDadosAppComponent } from './modulo-ciencia-dados-app.component';
import { ModuloCienciaDadosMainComponent } from './modulo-ciencia-dados-main/modulo-ciencia-dados-main.component';
import { ModuloCienciaDadosRoutingModule } from './modulo-ciencia-dados-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ModuloCienciaDadosAppComponent,
    ModuloCienciaDadosMainComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ModuloCienciaDadosRoutingModule
  ]
})
export class ModuloCienciaDadosModule { }
