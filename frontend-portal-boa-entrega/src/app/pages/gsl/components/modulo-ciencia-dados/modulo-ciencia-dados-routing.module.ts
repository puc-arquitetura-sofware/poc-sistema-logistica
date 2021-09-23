import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloCienciaDadosAppComponent } from './modulo-ciencia-dados-app.component';
import { ModuloCienciaDadosMainComponent } from './modulo-ciencia-dados-main/modulo-ciencia-dados-main.component';

const routes: Routes = [{
  path: '', component: ModuloCienciaDadosAppComponent,
  children: [
      { 
        path: 'gestao-ciencia-dados', 
        component: ModuloCienciaDadosMainComponent
      },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCienciaDadosRoutingModule { }
