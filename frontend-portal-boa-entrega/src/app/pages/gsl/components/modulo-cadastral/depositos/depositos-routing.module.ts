import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositoAppComponent } from './deposito.app.component';
import { DetalharComponent } from './detalhar/detalhar.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { ListarComponent } from './listar/listar.component';
import { NovoComponent } from './novo/novo.component';
import { DepositoGuard } from './services/deposito.guard';
import { DepositoResolve } from './services/deposito.resolve';

const routes: Routes = [
  {
      path: '', component: DepositoAppComponent,
      children: [
          { path: 'listar-todos', component: ListarComponent },
          {
              path: 'adicionar-novo', component: NovoComponent,
              canDeactivate: [DepositoGuard],
              canActivate: [DepositoGuard],
            //   data: [{ claim: { nome: 'Deposito', valor: 'Adicionar'}}]
          },
          {
              path: 'editar/:id', component: EditarComponent,
              canActivate: [DepositoGuard],
            //   data: [{ claim: { nome: 'Deposito', valor: 'Atualizar' } }],
              resolve: {
                  deposito: DepositoResolve
              }
          },
          {
              path: 'detalhes/:id', component: DetalharComponent,
              resolve: {
                  deposito: DepositoResolve
              }
          },
          {
              path: 'excluir/:id', component: ExcluirComponent,
              canActivate: [DepositoGuard],
            //   data: [{ claim: { nome: 'Deposito', valor: 'Excluir' } }],
              resolve: {
                  deposito: DepositoResolve
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositosRoutingModule { }
