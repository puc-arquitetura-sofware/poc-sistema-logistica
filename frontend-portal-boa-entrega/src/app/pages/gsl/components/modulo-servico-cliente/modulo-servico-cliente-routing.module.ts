import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloServicoClienteAppComponent } from './modulo-servico-cliente-app.component';
import { ModuloServicoClienteMainComponent } from './modulo-servico-cliente-main/modulo-servico-cliente-main.component';

const routes: Routes = [{
  path: '', component: ModuloServicoClienteAppComponent,
  children: [
      { 
        path: 'servico-clientes', 
        component: ModuloServicoClienteMainComponent
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module')
          .then(m => m.ClientesModule)
      },
      {
        path: 'logistica',
        loadChildren: () => import('./logistica/logistica.module')
          .then(m => m.LogisticaModule)
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServicoClienteRoutingModule { }
