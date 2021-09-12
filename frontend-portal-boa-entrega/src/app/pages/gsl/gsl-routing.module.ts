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
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GslRoutingModule { }
