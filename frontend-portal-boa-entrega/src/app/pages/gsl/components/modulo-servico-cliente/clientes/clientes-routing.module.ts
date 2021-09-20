import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ListaComponent } from './lista/lista.component';

import { ClienteAppComponent } from './clientes.app.component';
import { ClienteGuard } from './services/cliente.guard';
import { ClienteResolve } from './services/cliente.resolve';

const routes: Routes = [
  {
    path: '', component: ClienteAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
          path: 'editar/:id', component: EditarComponent,
          canActivate: [ClienteGuard],
          // data: [{ claim: { nome: 'Mercadoria', valor: 'Atualizar' } }],
          resolve: {
              cliente: ClienteResolve
          }
      },
      {
          path: 'detalhes/:id', component: DetalhesComponent,
          resolve: {
            cliente: ClienteResolve
        }
      }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
