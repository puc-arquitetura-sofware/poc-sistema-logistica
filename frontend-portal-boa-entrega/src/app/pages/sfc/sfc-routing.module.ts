import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SfcGuard } from './services/sfc.guard';
import { SfcAppComponent } from './sfc.app.component';

const routes: Routes = [{
  path: '', component: SfcAppComponent,
  children: [
      { 
        path: 'modulo-faturamento-cobranca', 
        component: MainComponent, canActivate: [SfcGuard]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SfcRoutingModule { }
