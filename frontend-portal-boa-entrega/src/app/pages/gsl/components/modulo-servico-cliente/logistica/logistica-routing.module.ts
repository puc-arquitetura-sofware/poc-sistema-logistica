import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { LogisticaAppComponent } from './logistica.app.component';

const routes: Routes = [
  {
    path: '', component: LogisticaAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }
