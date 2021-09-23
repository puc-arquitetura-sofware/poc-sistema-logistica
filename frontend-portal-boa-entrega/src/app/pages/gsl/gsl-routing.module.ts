import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { GslAppComponent } from './gsl.app.component';
import { GslGuard } from './services/gsl.guard';

const routes: Routes = [ {
  path: '', component: GslAppComponent,
  children: [
      { 
        path: 'modulo-gestao-servicos-logistica', 
        component: MainComponent, canActivate: [GslGuard]
      },
      {
        path: 'modulo-gestao-servicos-logistica/modulo-cadastral',
        loadChildren: () => import('./components/modulo-cadastral/modulo-cadastral.module')
          .then(m => m.ModuloCadastralModule)
      },
      {
        path: 'modulo-gestao-servicos-logistica/modulo-gestao-estrategica',
        loadChildren: () => import('./components/modulo-gestao-estrategica/modulo-gestao-estrategica.module')
          .then(m => m.ModuloGestaoEstrategicaModule)
      },
      {
        path: 'modulo-gestao-servicos-logistica/modulo-servico-cliente',
        loadChildren: () => import('./components/modulo-servico-cliente/modulo-servico-cliente.module')
          .then(m => m.ModuloServicoClienteModule)
      },
      {
        path: 'modulo-gestao-servicos-logistica/modulo-ciencia-dados',
        loadChildren: () => import('./components/modulo-ciencia-dados/modulo-ciencia-dados.module')
          .then(m => m.ModuloCienciaDadosModule)
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GslRoutingModule { }
