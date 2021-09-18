import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloGestaoEstrategicaAppComponent } from './modulo-gestao-estrategica-app.component';
import { ModuloGestaoEstrategicaMainComponent } from './modulo-gestao-estrategica-main/modulo-gestao-estrategica-main.component';

const routes: Routes = [{
  path: '', component: ModuloGestaoEstrategicaAppComponent,
  children: [
      { 
        path: 'gestao-estrategica', 
        component: ModuloGestaoEstrategicaMainComponent
      },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloGestaoEstrategicaRoutingModule { }
