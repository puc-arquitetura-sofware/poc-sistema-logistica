import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaGuard } from '../conta/services/conta.guard';
import { MainComponent } from './main/main.component';
import { SafAppComponent } from './saf.app.component';
import { SafGuard } from './services/saf.guard';

const routes: Routes = [   {
  path: '', component: SafAppComponent,
  children: [
      { 
        path: 'modulo-financeiro', 
        component: MainComponent, canActivate: [SafGuard]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafRoutingModule { }
