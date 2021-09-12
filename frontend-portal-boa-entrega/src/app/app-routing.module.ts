import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoNegadoComponent } from './pages/navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './pages/navegacao/home/home.component';
import { NotFoundComponent } from './pages/navegacao/not-found/not-found.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'conta',
    loadChildren: () => import('./pages/conta/conta.module')
      .then(m => m.ContaModule)
  },
  {
    path: 'saf',
    loadChildren: () => import('./pages/saf/saf.module')
      .then(m => m.SafModule)
  },
  {
    path: 'sfc',
    loadChildren: () => import('./pages/sfc/sfc.module')
      .then(m => m.SfcModule)
  },
  {
    path: 'sge',
    loadChildren: () => import('./pages/sge/sge.module')
      .then(m => m.SgeModule)
  },
  {
    path: 'gsl',
    loadChildren: () => import('./pages/gsl/gsl.module')
      .then(m => m.GslModule)
  },
  // {
  //   path: 'produtos',
  //   loadChildren: () => import('./produto/produto.module')
  //     .then(m => m.ProdutoModule)
  // },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
