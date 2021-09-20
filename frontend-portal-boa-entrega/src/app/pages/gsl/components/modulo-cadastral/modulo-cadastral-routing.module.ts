import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloCadastralAppComponent } from './modulo-cadastral-app.component';
import { ModuloCadastralMainComponent } from './modulo-cadastral-main/modulo-cadastral-main.component';

const routes: Routes = [{
  path: '', component: ModuloCadastralAppComponent,
  children: [
      { 
        path: 'gerenciar-cadastros', 
        component: ModuloCadastralMainComponent
      },
      {
        path: 'depositos',
        loadChildren: () => import('./depositos/depositos.module')
          .then(m => m.DepositosModule)
      },
      {
        path: 'mercadorias',
        loadChildren: () => import('./mercadorias/mercadoria.module')
          .then(m => m.MercadoriaModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module')
          .then(m => m.UsuariosModule)
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCadastralRoutingModule { }
