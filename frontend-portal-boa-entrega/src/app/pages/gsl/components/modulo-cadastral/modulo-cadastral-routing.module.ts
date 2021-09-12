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
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloCadastralRoutingModule { }
