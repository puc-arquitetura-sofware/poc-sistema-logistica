import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { UsuarioGuard } from './services/usuario.guard';
import { UsuarioResolve } from './services/usuario.resolve';
import { UsuarioAppComponent } from './usuario.app.component';

const routes: Routes = [
  {
    path: '', component: UsuarioAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
          path: 'editar/:id', component: EditarComponent,
          canActivate: [UsuarioGuard],
          // data: [{ claim: { nome: 'Mercadoria', valor: 'Atualizar' } }],
          resolve: {
              usuario: UsuarioResolve
          }
      },
      {
          path: 'detalhes/:id', component: DetalhesComponent,
          resolve: {
            usuario: UsuarioResolve
          }
      },
      {
          path: 'excluir/:id', component: ExcluirComponent,
          canActivate: [UsuarioGuard],
          // data: [{ claim: { nome: 'Mercadoria', valor: 'Excluir' } }],
          resolve: {
            usuario: UsuarioResolve
          }
      },
      {
          path: 'adicionar-novo', component: NovoComponent,
          canActivate: [UsuarioGuard],
          // data: [{ claim: { nome: 'Mercadoria', valor: 'Excluir' } }],
      }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
